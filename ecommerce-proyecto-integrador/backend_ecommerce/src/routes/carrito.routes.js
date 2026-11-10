import express from "express";

import { autenticarUsuario } from "../middlewares/auth.middleware.js";

import {
    obtenerCarrito,
    agregarProducto,
    actualizarCantidad,
    eliminarItem
} from "../controllers/carrito.controller.js";

const router = express.Router();

router.get("/", autenticarUsuario, obtenerCarrito);
router.post("/items", autenticarUsuario, agregarProducto);
router.put("/items/:itemId", autenticarUsuario, actualizarCantidad);
router.delete("/items/:itemId", autenticarUsuario, eliminarItem)
export default router;