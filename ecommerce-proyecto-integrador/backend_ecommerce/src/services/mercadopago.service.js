
import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import prisma from "../config/prisma.js";

const clienteMercadoPago = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN
});

const preferencia = new Preference(clienteMercadoPago);
const pagoMercadoPago = new Payment(clienteMercadoPago);


// URL pública del frontend, usada para armar las direcciones de retorno.
// Mercado Pago las rechaza si no son absolutas, así que se normaliza la barra
// final para no terminar con "//pago/resultado".
function obtenerUrlDelFrontend() {
    const url = process.env.FRONTEND_URL || "https://zerolag-xi.vercel.app";

    return url.replace(/\/+$/, "");
}


export async function consultarPagoMercadoPago(pagoId) {
    const resultado = await pagoMercadoPago.get({
        id: pagoId
    });

    return resultado;
}


export async function crearPreferenciaDePago(usuarioId, pedidoId) {
    const pedido = await prisma.pedidos.findFirst({
        where: {
            id: pedidoId,
            usuario_id: usuarioId
        },
        include: {
            detalle_pedidos: {
                include: {
                    productos: true
                }
            },
            pagos: true
        }
    });

    if (!pedido) {
        throw new Error("Pedido no encontrado");
    }

    if (pedido.estado !== "PENDIENTE") {
        throw new Error("El pedido no está pendiente de pago");
    }

    if (pedido.detalle_pedidos.length === 0) {
        throw new Error("El pedido no tiene productos");
    }

    if (pedido.pagos) {
        throw new Error("El pedido ya tiene un registro de pago");
    }

    const items = pedido.detalle_pedidos.map((detalle) => ({
        id: detalle.producto_id,
        title: detalle.productos.nombre,
        quantity: detalle.cantidad,
        unit_price: Number(detalle.precio_unitario),
        currency_id: "ARS"
    }));

    // A donde vuelve el comprador cuando termina de pagar. Las tres
    // situaciones usan la misma pantalla: el frontend consulta el estado real
    // del pedido en lugar de confiar en lo que llega por la URL.
    const urlRetorno = `${obtenerUrlDelFrontend()}/pago/resultado`;

    const resultado = await preferencia.create({
        body: {
            items,
            external_reference: pedido.id,
            notification_url: process.env.MERCADOPAGO_NOTIFICATION_URL,
            back_urls: {
                success: urlRetorno,
                failure: urlRetorno,
                pending: urlRetorno
            },
            // Vuelve solo al sitio cuando el pago se aprueba, sin que el
            // comprador tenga que tocar "Volver al sitio".
            auto_return: "approved",
            metadata: {
                pedido_id: pedido.id,
                usuario_id: usuarioId
            }
        }
    });

    await prisma.pagos.create({
        data: {
            pedido_id: pedido.id,
            mercadopago_id: resultado.id,
            estado: "PENDIENTE",
            monto: pedido.total
        }
    });

    return {
        pedido_id: pedido.id,
        preferencia_id: resultado.id,
        url_pago: resultado.init_point,
        url_pago_prueba: resultado.sandbox_init_point
    };
}
