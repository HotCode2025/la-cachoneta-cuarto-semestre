import prisma from "../config/prisma.js";

export async function crearPedidoDesdeCarrito(usuarioId) {
    return await prisma.$transaction(async (tx) => {
        const carrito = await tx.carritos.findUnique({
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

        if (!carrito) {
            throw new Error("Carrito no encontrado");
        }

        if (carrito.carrito_items.length === 0) {
            throw new Error("El carrito está vacío");
        }

        for (const item of carrito.carrito_items) {
            if (!item.productos.activo) {
                throw new Error(
                    `El producto "${item.productos.nombre}" no está disponible`
                );
            }

            if (item.cantidad > item.productos.stock) {
                throw new Error(
                    `Stock insuficiente para el producto "${item.productos.nombre}"`
                );
            }
        }

        const total = carrito.carrito_items.reduce(
            (acumulado, item) => {
                return acumulado + Number(item.productos.precio) * item.cantidad;
            },
            0
        );

        const pedido = await tx.pedidos.create({
            data: {
                usuario_id: usuarioId,
                total: total,
                estado: "PENDIENTE"
            }
        });

        for (const item of carrito.carrito_items) {
            const precioUnitario = Number(item.productos.precio);
            const subtotal = precioUnitario * item.cantidad;

            await tx.detalle_pedidos.create({
                data: {
                    pedido_id: pedido.id,
                    producto_id: item.producto_id,
                    cantidad: item.cantidad,
                    precio_unitario: precioUnitario,
                    subtotal: subtotal
                }
            });

            await tx.productos.update({
                where: {
                    id: item.producto_id
                },
                data: {
                    stock: {
                        decrement: item.cantidad
                    }
                }
            });
        }

        await tx.carrito_items.deleteMany({
            where: {
                carrito_id: carrito.id
            }
        });

        return await tx.pedidos.findUnique({
            where: {
                id: pedido.id
            },
            include: {
                detalle_pedidos: {
                    include: {
                        productos: true
                    }
                }
            }
        });
    });
}

export async function obtenerPedidosPorUsuario(usuarioId) {
    return await prisma.pedidos.findMany({
        where: {
            usuario_id: usuarioId
        },
        orderBy: {
            fecha_creacion: "desc"
        },
        include: {
            detalle_pedidos: {
                include: {
                    productos: true
                }
            }
        }
    });
}

export async function obtenerPedidoPorId(usuarioId, pedidoId) {
    return await prisma.pedidos.findFirst({
        where: {
            id: pedidoId,
            usuario_id: usuarioId
        },
        include: {
            detalle_pedidos: {
                include: {
                    productos: true
                }
            }
        }
    });
}