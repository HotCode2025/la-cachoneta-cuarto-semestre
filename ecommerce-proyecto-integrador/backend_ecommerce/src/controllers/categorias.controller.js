import {
    obtenerCategorias,
    obtenerCategoriaPorId,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
} from "../services/categorias.service.js";

const UUID_REGEX =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// listar categorias contemplando errores
export async function listarCategorias(req, res) {
    try {
        const categorias = await obtenerCategorias();

        res.json(categorias);
    } catch (error) {
        console.error("Error al obtener categorías:", error);

        res.status(500).json({
            error: "Error al obtener las categorías"
        });
    }
}

// busca una categoria contemplando errores
export async function buscarCategoriaPorId(req, res) {
    const { id } = req.params;

    if (!UUID_REGEX.test(id)) {
        return res.status(400).json({
            error: "El ID de la categoría debe ser un UUID válido"
        });
    }

    try {
        const categoria = await obtenerCategoriaPorId(id);

        if (!categoria) {
            return res.status(404).json({
                error: "Categoría no encontrada"
            });
        }

        res.json(categoria);
    } catch (error) {
        console.error("Error al obtener categoría:", error);

        res.status(500).json({
            error: "Error al obtener la categoría"
        });
    }
}

// Alta de categoría. Requiere un usuario con rol ADMIN.
export async function registrarCategoria(req, res) {
    const { datos, errores } = validarDatosCategoria(req.body, false);

    if (errores.length > 0) {
        return res.status(400).json({
            error: "Los datos de la categoría no son válidos",
            detalles: errores
        });
    }

    try {
        const categoria = await crearCategoria(datos);

        res.status(201).json(categoria);
    } catch (error) {
        console.error("Error al registrar categoría:", error);

        if (error.message === "Ya existe una categoría con ese nombre") {
            return res.status(409).json({
                error: error.message
            });
        }

        res.status(500).json({
            error: "Error al registrar la categoría"
        });
    }
}

// Modificación de categoría.
export async function editarCategoria(req, res) {
    const { id } = req.params;

    if (!UUID_REGEX.test(id)) {
        return res.status(400).json({
            error: "El ID de la categoría debe ser un UUID válido"
        });
    }

    const { datos, errores } = validarDatosCategoria(req.body, true);

    if (errores.length > 0) {
        return res.status(400).json({
            error: "Los datos de la categoría no son válidos",
            detalles: errores
        });
    }

    if (Object.keys(datos).length === 0) {
        return res.status(400).json({
            error: "No se recibió ningún campo para modificar"
        });
    }

    try {
        const categoria = await actualizarCategoria(id, datos);

        res.json(categoria);
    } catch (error) {
        console.error("Error al editar categoría:", error);

        if (error.message === "Categoría no encontrada") {
            return res.status(404).json({
                error: error.message
            });
        }

        if (error.message === "Ya existe una categoría con ese nombre") {
            return res.status(409).json({
                error: error.message
            });
        }

        res.status(500).json({
            error: "Error al editar la categoría"
        });
    }
}

// Baja de categoría. Se rechaza mientras tenga productos asociados.
export async function borrarCategoria(req, res) {
    const { id } = req.params;

    if (!UUID_REGEX.test(id)) {
        return res.status(400).json({
            error: "El ID de la categoría debe ser un UUID válido"
        });
    }

    try {
        await eliminarCategoria(id);

        res.json({
            mensaje: "Categoría eliminada"
        });
    } catch (error) {
        console.error("Error al eliminar categoría:", error);

        if (error.message === "Categoría no encontrada") {
            return res.status(404).json({
                error: error.message
            });
        }

        if (error.message === "La categoría tiene productos asociados") {
            return res.status(409).json({
                error:
                    `No se puede eliminar: la categoría tiene ` +
                    `${error.cantidadProductos} producto(s) asociado(s). ` +
                    `Reasignalos a otra categoría antes de eliminarla.`,
                cantidad_productos: error.cantidadProductos
            });
        }

        res.status(500).json({
            error: "Error al eliminar la categoría"
        });
    }
}

// Valida el cuerpo de la solicitud y arma el objeto que recibe Prisma.
// Con parcial en true (modificación) solo se validan los campos presentes.
function validarDatosCategoria(body, parcial) {
    const datos = {};
    const errores = [];

    if (!body || typeof body !== "object") {
        return {
            datos,
            errores: ["El cuerpo de la solicitud está vacío"]
        };
    }

    const { nombre, descripcion } = body;

    // Nombre
    if (nombre !== undefined) {
        if (typeof nombre !== "string" || nombre.trim().length < 3) {
            errores.push("El nombre debe tener al menos 3 caracteres");
        } else if (nombre.trim().length > 100) {
            errores.push("El nombre no puede superar los 100 caracteres");
        } else {
            datos.nombre = nombre.trim();
        }
    } else if (!parcial) {
        errores.push("El campo nombre es obligatorio");
    }

    // Descripción
    if (descripcion !== undefined) {
        if (descripcion === null) {
            datos.descripcion = null;
        } else if (typeof descripcion !== "string") {
            errores.push("La descripción debe ser un texto");
        } else {
            datos.descripcion = descripcion.trim();
        }
    }

    return { datos, errores };
}
