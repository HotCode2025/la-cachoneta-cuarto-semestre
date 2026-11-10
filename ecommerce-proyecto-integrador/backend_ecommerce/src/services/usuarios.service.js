import prisma from "../config/prisma.js";

// crea un usuario en supabase
export async function crearUsuario(datosUsuario) {
    return await prisma.$transaction(async (tx) => {
        const usuario = await tx.usuarios.create({
            data: datosUsuario
        });

        await tx.carritos.create({
            data: {
                usuario_id: usuario.id
            }
        });

        return usuario;
    });
}

export async function obtenerUsuarioPorEmail(email) {
    return await prisma.usuarios.findUnique({
        where: {
            email: email
        }
    });
}