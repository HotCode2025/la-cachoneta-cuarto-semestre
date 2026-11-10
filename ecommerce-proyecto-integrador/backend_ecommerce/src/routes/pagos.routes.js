
import express from "express";
import { autenticarUsuario } from "../middlewares/auth.middleware.js";
import { 
    crearPreferencia, 
    recibirWebhook 
} from "../controllers/pagos.controller.js";

const router = express.Router();

router.post("/crear-preferencia", autenticarUsuario, crearPreferencia);

// Recibe las notificaciones de Mercado Pago.
router.post("/webhook", recibirWebhook);

export default router;
