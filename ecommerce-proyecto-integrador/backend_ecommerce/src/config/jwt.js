import jwt from "jsonwebtoken";

export function generarToken(usuario) {
    return jwt.sign(
        {
            id: usuario.id,
            rol: usuario.rol
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "2h"
        }
    );
}