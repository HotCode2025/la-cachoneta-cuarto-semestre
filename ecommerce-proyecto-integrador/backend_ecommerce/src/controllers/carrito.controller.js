import {
    obtenerCarritoPorUsuario,
    agregarProductoAlCarrito,
    actualizarCantidadItem,
    eliminarItemCarrito
} from "../services/carrito.service.js";

export async function obtenerCarrito(req, res) {
    try {
        const usuarioId = req.usuario.id;

        const carrito = await obtenerCarritoPorUsuario(usuarioId);

        if (!carrito) {
            return res.status(404).json({
                error: "Carrito no encontrado"
            });
        }

        res.json(carrito);
    } catch (error) {
        console.error("Error al obtener carrito:", error);

        res.status(500).json({
            error: "Error al obtener el carrito"
        });
    }
}

export async function agregarProducto(req, res) {
    try {
        const usuarioId = req.usuario.id;

        const { producto_id, cantidad } = req.body;

        const item = await agregarProductoAlCarrito(
            usuarioId,
            producto_id,
            cantidad
        );

        res.status(201).json(item);
    } catch (error) {
        console.error("Error al agregar producto al carrito:", error);

        if (error.message === "Carrito no encontrado") {
            return res.status(404).json({
                error: error.message
            });
        }

        if (error.message === "Producto no encontrado") {
            return res.status(404).json({
                error: error.message
            });
        }

        if (error.message === "El producto no está disponible") {
            return res.status(400).json({
                error: error.message
            });
        }

        if (error.message === "Stock insuficiente") {
            return res.status(400).json({
                error: error.message
            });
        }

        res.status(500).json({
            error: "Error al agregar el producto al carrito"
        });
    }
}

export async function actualizarCantidad(req, res) {
    try {
        const usuarioId = req.usuario.id;
        const { itemId } = req.params;
        const { cantidad } = req.body;

        const item = await actualizarCantidadItem(
            usuarioId,
            itemId,
            cantidad
        );

        res.json(item);
    } catch (error) {
        console.error("Error al actualizar cantidad:", error);

        if (error.message === "Carrito no encontrado") {
            return res.status(404).json({
                error: error.message
            });
        }

        if (error.message === "Producto no encontrado en el carrito") {
            return res.status(404).json({
                error: error.message
            });
        }

        if (error.message === "El producto no está disponible") {
            return res.status(400).json({
                error: error.message
            });
        }

        if (error.message === "Stock insuficiente") {
            return res.status(400).json({
                error: error.message
            });
        }

        res.status(500).json({
            error: "Error al actualizar la cantidad"
        });
    }
}

export async function eliminarItem(req, res) {
    try {
        const usuarioId = req.usuario.id;
        const { itemId } = req.params;

        await eliminarItemCarrito(usuarioId, itemId);

        res.json({
            mensaje: "Producto eliminado del carrito"
        });
    } catch (error) {
        console.error("Error al eliminar producto del carrito:", error);

        if (error.message === "Carrito no encontrado") {
            return res.status(404).json({
                error: error.message
            });
        }

        if (error.message === "Producto no encontrado en el carrito") {
            return res.status(404).json({
                error: error.message
            });
        }

        res.status(500).json({
            error: "Error al eliminar el producto del carrito"
        });
    }
}
