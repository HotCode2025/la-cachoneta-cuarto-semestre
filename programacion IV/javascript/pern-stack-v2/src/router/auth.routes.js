import Router from "express-promise-router";
import { signin, signup, logout, profile } from "../controllers/auth.controller.js";

const router = Router();

router.post('/signin', signin);

router.post('/signup', signup);

router.post('/logout', logout);

router.get('/profile', profile);

export default router;
