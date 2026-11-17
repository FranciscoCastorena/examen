import type { ClienteDatos } from './types';

export type ErroresCliente = Partial<Record<keyof ClienteDatos, string>>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
