import prisma from "../config/prisma.js";

export async function obtenerCarritoPorUsuario(usuarioId) {
    return await prisma.carritos.findUnique({
        where: {
            usuario_id: usuarioId
        },
        include: {
            carrito_items: {
                include: {
                    productos: true
                }
            }
        }
    });
}

export async function agregarProductoAlCarrito(usuarioId, productoId, cantidad) {
    const carrito = await prisma.carritos.findUnique({
        where: {
            usuario_id: usuarioId
        }
    });

    if (!carrito) {
        throw new Error("Carrito no encontrado");
    }

    const producto = await prisma.productos.findUnique({
        where: {
            id: productoId
        }
    });

    if (!producto) {
        throw new Error("Producto no encontrado");
    }

    if (!producto.activo) {
        throw new Error("El producto no está disponible");
    }

    if (cantidad > producto.stock) {
        throw new Error("Stock insuficiente");
    }

    const itemExistente = await prisma.carrito_items.findFirst({
        where: {
            carrito_id: carrito.id,
            producto_id: productoId
        }
    });

    if (itemExistente) {
        const nuevaCantidad = itemExistente.cantidad + cantidad;

        if (nuevaCantidad > producto.stock) {
            throw new Error("Stock insuficiente");
        }

        return await prisma.carrito_items.update({
            where: {
                id: itemExistente.id
            },
            data: {
                cantidad: nuevaCantidad
            },
            include: {
                productos: true
            }
        });
    }

    return await prisma.carrito_items.create({
        data: {
            carrito_id: carrito.id,
            producto_id: productoId,
            cantidad: cantidad
        },
        include: {
            productos: true
        }
    });
}

export async function actualizarCantidadItem(usuarioId, itemId, cantidad) {
    const carrito = await prisma.carritos.findUnique({
        where: {
            usuario_id: usuarioId
        }
    });

    if (!carrito) {
        throw new Error("Carrito no encontrado");
    }

    const item = await prisma.carrito_items.findFirst({
        where: {
            id: itemId,
            carrito_id: carrito.id
        },
        include: {
            productos: true
        }
    });

    if (!item) {
        throw new Error("Producto no encontrado en el carrito");
    }

    if (!item.productos.activo) {
        throw new Error("El producto no está disponible");
    }

    if (cantidad > item.productos.stock) {
        throw new Error("Stock insuficiente");
    }

    return await prisma.carrito_items.update({
        where: {
            id: item.id
        },
        data: {
            cantidad: cantidad
        },
        include: {
            productos: true
        }
    });
}

export async function eliminarItemCarrito(usuarioId, itemId) {
    const carrito = await prisma.carritos.findUnique({
        where: {
            usuario_id: usuarioId
        }
    });

    if (!carrito) {
        throw new Error("Carrito no encontrado");
    }

    const item = await prisma.carrito_items.findFirst({
        where: {
            id: itemId,
            carrito_id: carrito.id
        }
    });

    if (!item) {
        throw new Error("Producto no encontrado en el carrito");
    }

    return await prisma.carrito_items.delete({
        where: {
            id: item.id
        }
    });
}