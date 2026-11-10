import {
    crearPedidoDesdeCarrito,
    obtenerPedidosPorUsuario,
    obtenerPedidoPorId
} from "../services/pedidos.service.js";

export async function crearPedido(req, res) {
    try {
        const usuarioId = req.usuario.id;

        const pedido = await crearPedidoDesdeCarrito(usuarioId);

        res.status(201).json(pedido);
    } catch (error) {
        console.error("Error al crear pedido:", error);

        if (error.message === "Carrito no encontrado") {
            return res.status(404).json({
                error: error.message
            });
        }

        if (error.message === "El carrito está vacío") {
            return res.status(400).json({
                error: error.message
            });
        }

        if (
            error.message.startsWith("El producto") ||
            error.message.startsWith("Stock insuficiente")
        ) {
            return res.status(400).json({
                error: error.message
            });
        }

        res.status(500).json({
            error: "Error al crear el pedido"
        });
    }
}

export async function listarPedidos(req, res) {
    try {
        const usuarioId = req.usuario.id;

        const pedidos = await obtenerPedidosPorUsuario(usuarioId);

        res.json(pedidos);
    } catch (error) {
        console.error("Error al obtener pedidos:", error);

        res.status(500).json({
            error: "Error al obtener los pedidos"
        });
    }
}

export async function buscarPedidoPorId(req, res) {
    const { id } = req.params;

    const uuidValido =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

    if (!uuidValido) {
        return res.status(400).json({
            error: "El ID del pedido debe ser un UUID válido"
        });
    }

    try {
        const usuarioId = req.usuario.id;

        const pedido = await obtenerPedidoPorId(usuarioId, id);

        if (!pedido) {
            return res.status(404).json({
                error: "Pedido no encontrado"
            });
        }

        res.json(pedido);
    } catch (error) {
        console.error("Error al obtener pedido:", error);

        res.status(500).json({
            error: "Error al obtener el pedido"
        });
    }
}
