import { AppError } from './errores';

export interface ClienteData {
  nombre_completo: string;
  email: string;
  telefono: string | null;
  empresa: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Valida los datos del cliente y devuelve los datos limpios
export function validarCliente(body: Partial<ClienteData> = {}): ClienteData {
  const nombre_completo = String(body.nombre_completo ?? '').trim();
  const email = String(body.email ?? '').trim().toLowerCase();
  const telefono = String(body.telefono ?? '').trim();
  const empresa = String(body.empresa ?? '').trim();

  if (!nombre_completo) {
    throw new AppError('El nombre completo es obligatorio', 400);
  }
  if (!email) {
    throw new AppError('El email es obligatorio', 400);
  }
  if (!emailRegex.test(email)) {
    throw new AppError('El email no tiene un formato válido', 400);
  }
  if (!empresa) {
    throw new AppError('La empresa es obligatoria', 400);
  }

  return {
    nombre_completo,
    email,
    telefono: telefono || null,
    empresa,
  };
}
