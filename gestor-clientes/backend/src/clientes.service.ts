import { prisma } from './prisma';
import { AppError } from './errores';
import { ClienteData } from './clientes.validator';

// Aquí están todas las operaciones con la base de datos

export async function obtenerClientes() {
  return prisma.cliente.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function obtenerClientePorId(id: string) {
  const cliente = await prisma.cliente.findUnique({ where: { id } });
  if (!cliente) {
    throw new AppError('Cliente no encontrado', 404);
  }
  return cliente;
}

export async function crearCliente(data: ClienteData) {
  const existe = await prisma.cliente.findUnique({ where: { email: data.email } });
  if (existe) {
    throw new AppError('Ya existe un cliente con ese email', 409);
  }
  return prisma.cliente.create({ data });
}

export async function actualizarCliente(id: string, data: ClienteData) {
  await obtenerClientePorId(id);

  // El email no puede pertenecer a otro cliente
  const existe = await prisma.cliente.findUnique({ where: { email: data.email } });
  if (existe && existe.id !== id) {
    throw new AppError('Ya existe un cliente con ese email', 409);
  }

  return prisma.cliente.update({ where: { id }, data });
}

export async function eliminarCliente(id: string) {
  await obtenerClientePorId(id);
  await prisma.cliente.delete({ where: { id } });
}
