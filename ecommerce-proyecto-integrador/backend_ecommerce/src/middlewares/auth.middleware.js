import jwt from "jsonwebtoken";

export function autenticarUsuario(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                error: "Token de autenticación requerido"
            });
        }

        const [tipo, token] = authHeader.split(" "); 

        if (tipo !== "Bearer" || !token) {
            return res.status(401).json({
                error: "Formato de autenticación inválido"
            });
        }

        const datosUsuario = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.usuario = datosUsuario;

        next();
    } catch (error) {
        return res.status(401).json({
            error: "Token inválido o expirado"
        });
    }
}

// Identifica al usuario si envió un token válido, pero deja pasar las
// solicitudes anónimas. Sirve para rutas públicas que muestran información
// adicional a los administradores.
export function autenticacionOpcional(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return next();
    }

    const [tipo, token] = authHeader.split(" ");

    if (tipo !== "Bearer" || !token) {
        return next();
    }

    try {
        req.usuario = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
    } catch (error) {
        // Token inválido o expirado: se continúa como visitante anónimo.
    }

    next();
}