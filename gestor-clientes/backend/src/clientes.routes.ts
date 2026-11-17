import { Router } from 'express';
import * as clientesService from './clientes.service';
import { validarCliente } from './clientes.validator';

// Rutas de /api/clientes
// Express 5 manda automáticamente los errores al errorHandler

const router = Router();

// Obtener todos los clientes
router.get('/', async (req, res) => {
  const clientes = await clientesService.obtenerClientes();
  res.json({ success: true, data: clientes });
});

// Obtener un cliente por id
router.get('/:id', async (req, res) => {
  const cliente = await clientesService.obtenerClientePorId(req.params.id);
  res.json({ success: true, data: cliente });
});

// Crear un cliente
router.post('/', async (req, res) => {
  const datos = validarCliente(req.body);
  const cliente = await clientesService.crearCliente(datos);
  res.status(201).json({ success: true, message: 'Cliente creado correctamente', data: cliente });
});

// Actualizar un cliente
router.put('/:id', async (req, res) => {
  const datos = validarCliente(req.body);
  const cliente = await clientesService.actualizarCliente(req.params.id, datos);
  res.json({ success: true, message: 'Cliente actualizado correctamente', data: cliente });
});

// Eliminar un cliente
router.delete('/:id', async (req, res) => {
  await clientesService.eliminarCliente(req.params.id);
  res.json({ success: true, message: 'Cliente eliminado correctamente' });
});

export default router;
