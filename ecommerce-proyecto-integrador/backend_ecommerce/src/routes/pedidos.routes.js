import express from "express";

import { autenticarUsuario } from "../middlewares/auth.middleware.js";
import { crearPedido, listarPedidos, buscarPedidoPorId } from "../controllers/pedidos.controller.js";

const router = express.Router();

router.post("/", autenticarUsuario, crearPedido);
router.get("/", autenticarUsuario, listarPedidos);
router.get("/:id", autenticarUsuario, buscarPedidoPorId);

export default router;