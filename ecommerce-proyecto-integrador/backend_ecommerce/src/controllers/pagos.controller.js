
import {
    crearPreferenciaDePago,
    consultarPagoMercadoPago
} from "../services/mercadopago.service.js";

import {
    WebhookSignatureValidator,
    InvalidWebhookSignatureError
} from "mercadopago";

import prisma from "../config/prisma.js";


export async function crearPreferencia(req, res) {
    try {
        const usuarioId = req.usuario.id;
        const { pedido_id } = req.body;

        if (!pedido_id) {
            return res.status(400).json({
                error: "El campo pedido_id es obligatorio"
            });
        }

        const resultado = await crearPreferenciaDePago(
            usuarioId,
            pedido_id
        );

        return res.status(201).json(resultado);

    } catch (error) {
        if (error.message === "Pedido no encontrado") {
            return res.status(404).json({
                error: error.message
            });
        }

        if (
            error.message === "El pedido no está pendiente de pago" ||
            error.message === "El pedido no tiene productos" ||
            error.message === "El pedido ya tiene un registro de pago"
        ) {
            return res.status(400).json({
                error: error.message
            });
        }

        console.error(
            "Error al crear la preferencia de pago:",
            error
        );

        return res.status(500).json({
            error: "No se pudo crear la preferencia de pago"
        });
    }
}



export async function recibirWebhook(req, res) {
    const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET;

    const esIPNLegacy =
        Boolean(req.query.topic) && Boolean(req.query.id);

    let pagoId;
    let tipo;

    try {
        // 1. Identificar el formato de la notificación.
        if (esIPNLegacy) {
            tipo = req.query.topic;
            pagoId = req.query.id;

            // Las merchant_order no se procesan como pagos.
            if (tipo === "merchant_order") {
                return res.sendStatus(200);
            }

            if (tipo !== "payment") {
                return res.sendStatus(200);
            }
        } else {
            // 2. Webhooks: validar la firma antes de consultar el pago.
            if (!secret) {
                console.error(
                    "Falta configurar MERCADOPAGO_WEBHOOK_SECRET"
                );
                return res.sendStatus(500);
            }

            WebhookSignatureValidator.validate({
                xSignature: req.headers["x-signature"],
                xRequestId: req.headers["x-request-id"],
                dataId: req.query["data.id"],
                secret
            });

            tipo = req.query.type || req.body.type;
            pagoId = req.query["data.id"] || req.body.data?.id;

            if (tipo !== "payment" || !pagoId) {
                return res.sendStatus(200);
            }
        }

        // 3. Consultar el pago directamente en Mercado Pago.
        const pagoMP = await consultarPagoMercadoPago(pagoId);
        const pedidoId = pagoMP.external_reference;

        if (!pedidoId) {
            console.warn(
                "El pago no tiene un pedido asociado",
                pagoId
            );
            return res.sendStatus(200);
        }

        // 4. Comprobar que existe el pedido y su registro de pago.
        const pedido = await prisma.pedidos.findUnique({
            where: { id: pedidoId },
            include: { pagos: true }
        });

        if (!pedido || !pedido.pagos) {
            console.warn(
                "No existe el pedido o su registro de pago",
                pedidoId
            );
            return res.sendStatus(200);
        }

        // 5. Validar importe y moneda.
        const importeMercadoPago =
            Number(pagoMP.transaction_amount);
        const importePedido = Number(pedido.total);

        if (
            !Number.isFinite(importeMercadoPago) ||
            Math.abs(importeMercadoPago - importePedido) > 0.01 ||
            pagoMP.currency_id !== "ARS"
        ) {
            console.error(
                "El importe o la moneda no coinciden",
                pedidoId
            );
            return res.sendStatus(200);
        }

        // 6. Traducir el estado de Mercado Pago al estado del pedido.
        let estadoPedido;

        switch (pagoMP.status) {
            case "approved":
                estadoPedido = "APROBADO";
                break;

            case "rejected":
                estadoPedido = "RECHAZADO";
                break;

            case "cancelled":
                estadoPedido = "CANCELADO";
                break;

            case "pending":
            case "in_process":
            case "in_mediation":
                estadoPedido = "PENDIENTE";
                break;

            case "refunded":
            case "charged_back":
                estadoPedido = "REEMBOLSADO";
                break;

            default:
                console.warn(
                    "Estado de pago no contemplado:",
                    pagoMP.status
                );
                return res.sendStatus(200);
        }

        // 7. Actualizar el pago y el pedido en una transacción.
        await prisma.$transaction([
            prisma.pagos.update({
                where: { pedido_id: pedidoId },
                data: {
                    estado: pagoMP.status,
                    fecha_actualizacion: new Date()
                }
            }),

            prisma.pedidos.update({
                where: { id: pedidoId },
                data: { estado: estadoPedido }
            })
        ]);

        console.log(
            `[Pago procesado] origen=${esIPNLegacy ? "IPN legacy" : "Webhook"} ` +
            `pedido=${pedidoId} pago=${pagoMP.status} pedidoEstado=${estadoPedido}`
        );

        return res.sendStatus(200);

    } catch (error) {
        if (error instanceof InvalidWebhookSignatureError) {
            console.warn(
                "Firma inválida en notificación Webhook"
            );
            return res.sendStatus(401);
        }

        if (error.status === 404) {
            console.warn("Pago no encontrado:", pagoId);
            return res.sendStatus(200);
        }

        console.error(
            "Error al procesar la notificación:",
            error
        );

        return res.sendStatus(500);
    }
}
