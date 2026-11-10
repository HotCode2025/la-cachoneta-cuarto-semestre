import bcrypt from "bcrypt";
import { crearUsuario, obtenerUsuarioPorEmail } from "../services/usuarios.service.js";
import { generarToken } from "../config/jwt.js";
import { validarRegistro } from "../validators/usuarios.validator.js";

export async function registrarUsuario(req, res) {
    try {
        // validamos y limpiamos lo que recibimos del usuario (req.body)
        const { errores, datos } = validarRegistro(req.body);

        if (Object.keys(errores).length > 0) {
            return res.status(400).json({
                error: "Datos inválidos",
                errores
            });
        }

        const { nombre, apellido, email, telefono, pw } = datos;

        // hasheamos la contrase;a del usuario para que no quede visible en la base de datos
        const pwHash = await bcrypt.hash(pw, 10);

        // creamos un usuario, por ahora nosotros decidimos el rol
        const usuario = await crearUsuario({
            nombre,
            apellido,
            email,
            pw: pwHash,
            telefono,
            rol: "CLIENTE"
        });

        // payload: los datos del usuario creado, sin la contraseña
        res.status(201).json({
            mensaje: "Usuario registrado con éxito",
            payload: {
                id: usuario.id,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email,
                telefono: usuario.telefono,
                rol: usuario.rol
            }
        });
    } catch (error) {
        // P2002: Prisma avisa que ya existe un registro con ese valor único (el email)
        if (error.code === "P2002") {
            return res.status(409).json({
                error: "Ya existe una cuenta con ese correo electrónico."
            });
        }

        console.error("Error al registrar usuario:", error);

        res.status(500).json({
            error: "Error al registrar el usuario"
        });
    }
}

export async function iniciarSesion(req, res) {
    try {
        const { email, pw } = req.body ?? {};

        if (typeof email !== "string" || typeof pw !== "string" || !email.trim() || !pw) {
            return res.status(400).json({
                error: "Ingresá tu email y tu contraseña"
            });
        }

        const usuario = await obtenerUsuarioPorEmail(email);

        if (!usuario) {
            return res.status(401).json({
                error: "Email o contraseña incorrectos"
            });
        }

        const pwCorrecta = await bcrypt.compare(pw, usuario.pw);

        if (!pwCorrecta) {
            return res.status(401).json({
                error: "Email o contraseña incorrectos"
            });
        }

        if (!usuario.activo) {
            return res.status(403).json({
                error: "El usuario está inactivo"
            });
        }

        const token = generarToken(usuario);

        res.json({
            mensaje: "Inicio de sesión exitoso",
            token: token,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email,
                telefono: usuario.telefono,
                rol: usuario.rol
            }
        });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);

        res.status(500).json({
            error: "Error al iniciar sesión"
        });
    }
}