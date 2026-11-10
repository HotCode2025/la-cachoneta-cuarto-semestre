import prisma from "../config/prisma.js";

// obtiene las categorias de la base de datos con prisma.
// Incluye la cantidad de productos asociados, que el panel de administración
// necesita para saber si la categoría se puede eliminar.
export async function obtenerCategorias() {
    return await prisma.categorias.findMany({
        orderBy: {
            nombre: "asc"
        },
        include: {
            _count: {
                select: {
                    productos: true
                }
            }
        }
    });
}

// obtiene categoria por id de la base de datos
export async function obtenerCategoriaPorId(id) {
    return await prisma.categorias.findUnique({
        where: {
            id: id
        },
        include: {
            productos: true
        }
    });
}

// Alta de categoría. Se evita repetir nombres para no duplicar el catálogo.
export async function crearCategoria(datosCategoria) {
    await verificarNombreDisponible(datosCategoria.nombre);

    return await prisma.categorias.create({
        data: datosCategoria
    });
}

// Modificación de categoría. Solo actualiza los campos recibidos.
export async function actualizarCategoria(id, datosCategoria) {
    const categoria = await prisma.categorias.findUnique({
        where: {
            id: id
        }
    });

    if (!categoria) {
        throw new Error("Categoría no encontrada");
    }

    if (datosCategoria.nombre) {
        await verificarNombreDisponible(datosCategoria.nombre, id);
    }

    return await prisma.categorias.update({
        where: {
            id: id
        },
        data: datosCategoria
    });
}

// Baja de categoría. Se rechaza si todavía tiene productos asociados: los
// productos la referencian por clave foránea y la base no permitiría borrarla.
export async function eliminarCategoria(id) {
    const categoria = await prisma.categorias.findUnique({
        where: {
            id: id
        }
    });

    if (!categoria) {
        throw new Error("Categoría no encontrada");
    }

    // Se cuentan todos los productos, incluso los dados de baja, porque la
    // referencia en la base existe igual.
    const cantidadProductos = await prisma.productos.count({
        where: {
            categoria_id: id
        }
    });

    if (cantidadProductos > 0) {
        const error = new Error("La categoría tiene productos asociados");
        error.cantidadProductos = cantidadProductos;

        throw error;
    }

    return await prisma.categorias.delete({
        where: {
            id: id
        }
    });
}

// Comprueba que no exista otra categoría con el mismo nombre.
// Al modificar se excluye la categoría que se está editando.
async function verificarNombreDisponible(nombre, idAExcluir = null) {
    const existente = await prisma.categorias.findFirst({
        where: {
            nombre: {
                equals: nombre,
                mode: "insensitive"
            },
            ...(idAExcluir
                ? {
                    id: {
                        not: idAExcluir
                    }
                }
                : {})
        }
    });

    if (existente) {
        throw new Error("Ya existe una categoría con ese nombre");
    }

    return true;
}
