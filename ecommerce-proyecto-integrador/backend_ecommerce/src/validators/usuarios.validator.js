// Validación de los datos de registro. Mismas reglas que el front
// (src/utils/validarRegistro.js), porque el front se puede saltear.

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Letras (con tildes y ñ), espacios, apóstrofes y guiones. Sin números.
const REGEX_NOMBRE = /^\p{L}[\p{L}\s'’-]*$/u;

/**
 * Valida y limpia el body del registro.
 * Devuelve { errores, datos }:
 *  - errores: objeto { campo: "mensaje" }. Vacío si todo está bien.
 *  - datos: valores limpios (sin espacios sobrantes) listos para guardar.
 */
export function validarRegistro(body) {
    const { nombre, apellido, email, telefono, pw } = body ?? {};
    const errores = {};

    // Cada campo tiene que llegar como texto
    const esTexto = (valor) => typeof valor === "string";

    const nom = esTexto(nombre) ? nombre.trim() : "";
    if (nom.length < 2) {
        errores.nombre = "El nombre debe tener al menos 2 caracteres.";
    } else if (nom.length > 50) {
        errores.nombre = "El nombre no puede superar los 50 caracteres.";
    } else if (!REGEX_NOMBRE.test(nom)) {
        errores.nombre = "El nombre solo puede tener letras.";
    }

    const ape = esTexto(apellido) ? apellido.trim() : "";
    if (ape.length < 2) {
        errores.apellido = "El apellido debe tener al menos 2 caracteres.";
    } else if (ape.length > 50) {
        errores.apellido = "El apellido no puede superar los 50 caracteres.";
    } else if (!REGEX_NOMBRE.test(ape)) {
        errores.apellido = "El apellido solo puede tener letras.";
    }

    const mail = esTexto(email) ? email.trim() : "";
    if (!REGEX_EMAIL.test(mail) || mail.length > 254) {
        errores.email = "Ingresá un correo electrónico válido.";
    }

    // 10 dígitos (código de área + número). Se aceptan 11 si escriben el 0 inicial.
    const tel = esTexto(telefono) ? telefono.trim() : "";
    const digitosTel = tel.replace(/\D/g, "");
    if (!/^\d{10,11}$/.test(digitosTel) || tel.length > 50) {
        errores.telefono = "Ingresá un teléfono válido de 10 dígitos. Ej: 11 5500-1234.";
    }

    // bcrypt solo usa los primeros 72 bytes de la contraseña
    if (!esTexto(pw) || pw.length < 8) {
        errores.pw = "La contraseña debe tener al menos 8 caracteres.";
    } else if (Buffer.byteLength(pw, "utf8") > 72) {
        errores.pw = "La contraseña es demasiado larga (máximo 72 caracteres).";
    }

    return {
        errores,
        datos: { nombre: nom, apellido: ape, email: mail, telefono: tel, pw },
    };
}