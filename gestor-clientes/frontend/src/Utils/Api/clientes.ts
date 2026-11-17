import { http } from './http';
import type { Cliente, ClienteDatos } from '@/Pages/Clientes/types';

// Llamadas a la API de clientes.
// El backend responde { success, data }, por eso se devuelve response.data.data

// GET /api/clientes
export async function getClientes(): Promise<Cliente[]> {
    const response = await http.get('/clientes');
    return response.data.data;
}

// GET /api/clientes/:id
export async function getCliente(id: string): Promise<Cliente> {
    const response = await http.get(`/clientes/${id}`);
    return response.data.data;
}

// POST /api/clientes
export async function crearCliente(datos: ClienteDatos): Promise<Cliente> {
    const response = await http.post('/clientes', datos);
    return response.data.data;
}

// PUT /api/clientes/:id
export async function actualizarCliente(id: string, datos: ClienteDatos): Promise<Cliente> {
    const response = await http.put(`/clientes/${id}`, datos);
    return response.data.data;
}

// DELETE /api/clientes/:id
export async function eliminarCliente(id: string): Promise<void> {
    await http.delete(`/clientes/${id}`);
}
