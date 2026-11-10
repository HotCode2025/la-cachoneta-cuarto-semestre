// Restringe el acceso a las operaciones de administración.
// Se usa siempre después de autenticarUsuario, que es quien carga req.usuario.
export function requerirAdmin(req, res, next) {
    if (!req.usuario) {
        return res.status(401).json({
            error: "Token de autenticación requerido"
        });
    }

    if (req.usuario.rol !== "ADMIN") {
        return res.status(403).json({
            error: "Se requieren permisos de administrador"
        });
    }

    next();
}
