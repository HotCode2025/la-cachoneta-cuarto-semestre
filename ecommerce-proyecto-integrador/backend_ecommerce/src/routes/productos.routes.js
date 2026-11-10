import express from "express";

import {
    autenticarUsuario,
    autenticacionOpcional
} from "../middlewares/auth.middleware.js";

import { requerirAdmin } from "../middlewares/rol.middleware.js";

import {
    listarProductos,
    buscarProductoPorId,
    registrarProducto,
    editarProducto,
    modificarStock,
    cambiarEstado,
    eliminarProducto
} from "../controllers/productos.controller.js";

const router = express.Router();

/* Consultas públicas */

// El token es opcional: si pertenece a un ADMIN se pueden pedir los inactivos.
router.get("/", autenticacionOpcional, listarProductos);

router.get("/:id", buscarProductoPorId);

/* Administración del catálogo (solo rol ADMIN) */

router.post("/", autenticarUsuario, requerirAdmin, registrarProducto);

router.put("/:id", autenticarUsuario, requerirAdmin, editarProducto);

router.patch(
    "/:id/stock",
    autenticarUsuario,
    requerirAdmin,
    modificarStock
);

router.patch(
    "/:id/activo",
    autenticarUsuario,
    requerirAdmin,
    cambiarEstado
);

router.delete("/:id", autenticarUsuario, requerirAdmin, eliminarProducto);

export default router;
