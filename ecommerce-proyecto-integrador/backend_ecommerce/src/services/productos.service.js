import prisma from "../config/prisma.js";


// Funcion para obtener todos los productos, incluyendo la categoria.
// Por defecto solo devuelve los productos activos; los inactivos quedan
// reservados para el panel de administración.
export async function obtenerProductos({ incluirInactivos = false } = {}) {
    return await prisma.productos.findMany({
        where: incluirInactivos
            ? {}
            : {
                activo: true
            },
        include: {
            categorias: true
        },
        orderBy: {
            fecha_creacion: "desc"
        }
    });
}

// Busqueda de producto por uuid
export async function obtenerProductoPorId(id) {
    return await prisma.productos.findUnique({
        where: {
            id: id
        },
        include: {
            categorias: true
        }
    });
}

// Alta de producto. Verifica que la categoría indicada exista antes de crearlo.
export async function crearProducto(datosProducto) {
    if (datosProducto.categoria_id) {
        await verificarCategoria(datosProducto.categoria_id);
    }

    return await prisma.productos.create({
        data: datosProducto,
        include: {
            categorias: true
        }
    });
}

// Modificación de producto. Solo actualiza los campos recibidos.
export async function actualizarProducto(id, datosProducto) {
    const producto = await prisma.productos.findUnique({
        where: {
            id: id
        }
    });

    if (!producto) {
        throw new Error("Producto no encontrado");
    }

    if (datosProducto.categoria_id) {
        await verificarCategoria(datosProducto.categoria_id);
    }

    return await prisma.productos.update({
        where: {
            id: id
        },
        data: datosProducto,
        include: {
            categorias: true
        }
    });
}

// Ajuste de stock por diferencia: la cantidad puede ser positiva (ingreso de
// mercadería) o negativa (ajuste por rotura o faltante).
export async function ajustarStock(id, cantidad) {
    return await prisma.$transaction(async (tx) => {
        const producto = await tx.productos.findUnique({
            where: {
                id: id
            }
        });

        if (!producto) {
            throw new Error("Producto no encontrado");
        }

        const nuevoStock = producto.stock + cantidad;

        if (nuevoStock < 0) {
            throw new Error("El ajuste dejaría el stock en negativo");
        }

        return await tx.productos.update({
            where: {
                id: id
            },
            data: {
                stock: nuevoStock
            },
            include: {
                categorias: true
            }
        });
    });
}

// Baja y rehabilitación lógica. No se borra el registro porque los pedidos
// históricos y los carritos lo referencian.
export async function cambiarEstadoProducto(id, activo) {
    const producto = await prisma.productos.findUnique({
        where: {
            id: id
        }
    });

    if (!producto) {
        throw new Error("Producto no encontrado");
    }

    return await prisma.productos.update({
        where: {
            id: id
        },
        data: {
            activo: activo
        },
        include: {
            categorias: true
        }
    });
}

// Comprueba que la categoría exista para no guardar una referencia inválida.
async function verificarCategoria(categoriaId) {
    const categoria = await prisma.categorias.findUnique({
        where: {
            id: categoriaId
        }
    });

    if (!categoria) {
        throw new Error("Categoría no encontrada");
    }

    return categoria;
}
