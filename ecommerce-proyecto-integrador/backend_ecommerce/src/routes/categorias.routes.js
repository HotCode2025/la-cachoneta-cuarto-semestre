import express from "express";

import { autenticarUsuario } from "../middlewares/auth.middleware.js";
import { requerirAdmin } from "../middlewares/rol.middleware.js";

import {
    listarCategorias,
    buscarCategoriaPorId,
    registrarCategoria,
    editarCategoria,
    borrarCategoria
} from "../controllers/categorias.controller.js";

const router = express.Router();

/* Consultas públicas */

router.get("/", listarCategorias);

router.get("/:id", buscarCategoriaPorId);

/* Administración de categorías (solo rol ADMIN) */

router.post("/", autenticarUsuario, requerirAdmin, registrarCategoria);

router.put("/:id", autenticarUsuario, requerirAdmin, editarCategoria);

router.delete("/:id", autenticarUsuario, requerirAdmin, borrarCategoria);

export default router;
