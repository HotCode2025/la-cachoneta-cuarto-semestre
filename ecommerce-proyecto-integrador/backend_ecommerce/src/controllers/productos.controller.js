import {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    ajustarStock,
    cambiarEstadoProducto
} from "../services/productos.service.js";

const UUID_REGEX =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;


// funcion para listar productos con control de errores
export async function listarProductos(req, res) {
    try {
        // Solo un administrador autenticado puede ver los productos dados de baja.
        const esAdmin = req.usuario?.rol === "ADMIN";

        const incluirInactivos =
            esAdmin && req.query.incluirInactivos === "true";

        const productos = await obtenerProductos({
            incluirInactivos
        });

        res.json(productos);
    } catch (error) {
        console.error("Error al obtener productos:", error);

        res.status(500).json({
            error: "Error al obtener los productos"
        });
    }
}

// funcion para buscar un producto con errores
export async function buscarProductoPorId(req, res) {
    const { id } = req.params;

    if (!UUID_REGEX.test(id)) {
        return res.status(400).json({
            error: "El ID del producto debe ser un UUID válido"
        });
    }

    try {
        const producto = await obtenerProductoPorId(id);

        if (!producto) {
            return res.status(404).json({
                error: "Producto no encontrado"
            });
        }

        res.json(producto);
    } catch (error) {
        console.error("Error al obtener producto:", error);

        res.status(500).json({
            error: "Error al obtener el producto"
        });
    }
}

// Alta de producto. Requiere un usuario con rol ADMIN.
export async function registrarProducto(req, res) {
    const { datos, errores } = validarDatosProducto(req.body, false);

    if (errores.length > 0) {
        return res.status(400).json({
            error: "Los datos del producto no son válidos",
            detalles: errores
        });
    }

    try {
        const producto = await crearProducto(datos);

        res.status(201).json(producto);
    } catch (error) {
        console.error("Error al registrar producto:", error);

        if (error.message === "Categoría no encontrada") {
            return res.status(404).json({
                error: error.message
            });
        }

        res.status(500).json({
            error: "Error al registrar el producto"
        });
    }
}

// Modificación de producto. El stock se ajusta por su propio endpoint.
export async function editarProducto(req, res) {
    const { id } = req.params;

    if (!UUID_REGEX.test(id)) {
        return res.status(400).json({
            error: "El ID del producto debe ser un UUID válido"
        });
    }

    const { datos, errores } = validarDatosProducto(req.body, true);

    if (errores.length > 0) {
        return res.status(400).json({
            error: "Los datos del producto no son válidos",
            detalles: errores
        });
    }

    if (Object.keys(datos).length === 0) {
        return res.status(400).json({
            error: "No se recibió ningún campo para modificar"
        });
    }

    try {
        const producto = await actualizarProducto(id, datos);

        res.json(producto);
    } catch (error) {
        console.error("Error al editar producto:", error);

        if (
            error.message === "Producto no encontrado" ||
            error.message === "Categoría no encontrada"
        ) {
            return res.status(404).json({
                error: error.message
            });
        }

        res.status(500).json({
            error: "Error al editar el producto"
        });
    }
}

// Ajuste de stock por diferencia. Admite valores negativos.
export async function modificarStock(req, res) {
    const { id } = req.params;
    const { cantidad } = req.body;

    if (!UUID_REGEX.test(id)) {
        return res.status(400).json({
            error: "El ID del producto debe ser un UUID válido"
        });
    }

    if (!Number.isInteger(cantidad) || cantidad === 0) {
        return res.status(400).json({
            error: "La cantidad debe ser un número entero distinto de cero"
        });
    }

    try {
        const producto = await ajustarStock(id, cantidad);

        res.json(producto);
    } catch (error) {
        console.error("Error al ajustar el stock:", error);

        if (error.message === "Producto no encontrado") {
            return res.status(404).json({
                error: error.message
            });
        }

        if (error.message === "El ajuste dejaría el stock en negativo") {
            return res.status(400).json({
                error: error.message
            });
        }

        res.status(500).json({
            error: "Error al ajustar el stock del producto"
        });
    }
}

// Habilita o deshabilita un producto del catálogo.
export async function cambiarEstado(req, res) {
    const { id } = req.params;
    const { activo } = req.body;

    if (!UUID_REGEX.test(id)) {
        return res.status(400).json({
            error: "El ID del producto debe ser un UUID válido"
        });
    }

    if (typeof activo !== "boolean") {
        return res.status(400).json({
            error: "El campo activo debe ser true o false"
        });
    }

    try {
        const producto = await cambiarEstadoProducto(id, activo);

        res.json(producto);
    } catch (error) {
        console.error("Error al cambiar el estado del producto:", error);

        if (error.message === "Producto no encontrado") {
            return res.status(404).json({
                error: error.message
            });
        }

        res.status(500).json({
            error: "Error al cambiar el estado del producto"
        });
    }
}

// Baja lógica: el producto deja de aparecer en el catálogo pero se conserva
// porque los pedidos ya realizados lo referencian.
export async function eliminarProducto(req, res) {
    const { id } = req.params;

    if (!UUID_REGEX.test(id)) {
        return res.status(400).json({
            error: "El ID del producto debe ser un UUID válido"
        });
    }

    try {
        await cambiarEstadoProducto(id, false);

        res.json({
            mensaje: "Producto dado de baja"
        });
    } catch (error) {
        console.error("Error al dar de baja el producto:", error);

        if (error.message === "Producto no encontrado") {
            return res.status(404).json({
                error: error.message
            });
        }

        res.status(500).json({
            error: "Error al dar de baja el producto"
        });
    }
}

// Valida el cuerpo de la solicitud y arma el objeto que recibe Prisma.
// Con parcial en true (modificación) solo se validan los campos presentes.
function validarDatosProducto(body, parcial) {
    const datos = {};
    const errores = [];

    if (!body || typeof body !== "object") {
        return {
            datos,
            errores: ["El cuerpo de la solicitud está vacío"]
        };
    }

    const { nombre, descripcion, precio, img, stock, categoria_id } = body;

    // Nombre
    if (nombre !== undefined) {
        if (typeof nombre !== "string" || nombre.trim().length < 3) {
            errores.push("El nombre debe tener al menos 3 caracteres");
        } else if (nombre.trim().length > 255) {
            errores.push("El nombre no puede superar los 255 caracteres");
        } else {
            datos.nombre = nombre.trim();
        }
    } else if (!parcial) {
        errores.push("El campo nombre es obligatorio");
    }

    // Precio
    if (precio !== undefined) {
        const precioNumero = Number(precio);

        if (!Number.isFinite(precioNumero) || precioNumero <= 0) {
            errores.push("El precio debe ser un número mayor a cero");
        } else {
            datos.precio = precioNumero;
        }
    } else if (!parcial) {
        errores.push("El campo precio es obligatorio");
    }

    // Stock: en el alta es obligatorio; después se maneja con /stock.
    if (parcial) {
        if (stock !== undefined) {
            errores.push(
                "El stock se modifica con PATCH /api/productos/:id/stock"
            );
        }
    } else if (!Number.isInteger(stock) || stock < 0) {
        errores.push("El stock debe ser un número entero mayor o igual a cero");
    } else {
        datos.stock = stock;
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

    // Imagen
    if (img !== undefined) {
        if (img === null) {
            datos.img = null;
        } else if (typeof img !== "string") {
            errores.push("La imagen debe ser una URL en formato texto");
        } else {
            datos.img = img.trim();
        }
    }

    // Categoría
    if (categoria_id !== undefined) {
        if (categoria_id === null) {
            datos.categoria_id = null;
        } else if (!UUID_REGEX.test(categoria_id)) {
            errores.push("El ID de la categoría debe ser un UUID válido");
        } else {
            datos.categoria_id = categoria_id;
        }
    }

    return { datos, errores };
}
