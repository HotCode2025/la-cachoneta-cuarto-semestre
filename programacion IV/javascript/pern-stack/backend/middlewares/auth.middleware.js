import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
  const token = req.cookies.token;

  // 1. ¿Llega la cookie del frontend?
  console.log("TOKEN RECIBIDO EN COOKIE:", token);

  if (!token) {
    return res.status(401).json({
      message: "No estas autorizado",
    });
  }

  jwt.verify(token, "xyz123", (err, decoded) => {
    if (err) {
      console.log("ERROR AL VERIFICAR TOKEN:", err.message);
      return res.status(401).json({
        message: "No estas autorizado",
      });
    }

    // 2. ¿Qué hay dentro del token decodificado?
    console.log("TOKEN DECODIFICADO (decoded):", decoded);

    req.usuarioId = decoded.id;
    next();
  });
};
