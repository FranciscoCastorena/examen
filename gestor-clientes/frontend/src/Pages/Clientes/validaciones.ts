import type { ClienteDatos } from './types';

// Ejemplo: { email: 'El email es obligatorio' }
export type ErroresCliente = Record<string, string>;

// Formato: texto@texto.texto
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Devuelve un objeto con los errores encontrados, o {} si todo está bien
export function validarCliente(datos: ClienteDatos): ErroresCliente {
    const errores: ErroresCliente = {};

    if (!datos.nombre_completo.trim()) {
        errores.nombre_completo = 'El nombre completo es obligatorio';
    }

    if (!datos.email.trim()) {
        errores.email = 'El email es obligatorio';
    } else if (!emailRegex.test(datos.email.trim())) {
        errores.email = 'El email no tiene un formato válido';
    }

    if (!datos.empresa.trim()) {
        errores.empresa = 'La empresa es obligatoria';
    }

    return errores;
}
