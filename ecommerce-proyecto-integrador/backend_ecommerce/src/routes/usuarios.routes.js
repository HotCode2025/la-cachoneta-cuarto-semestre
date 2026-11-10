import express from "express";

import {
    registrarUsuario,
    iniciarSesion
} from "../controllers/usuarios.controller.js";

const router = express.Router();

router.post("/", registrarUsuario);

router.post("/login", iniciarSesion);

export default router;