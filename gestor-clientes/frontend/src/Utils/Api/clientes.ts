import { http } from './http';
import type { Cliente, ClienteDatos } from '@/Pages/Clientes/types';

export async function getClientes(): Promise<Cliente[]> {
    const response = await http.get('/clientes');
    return response.data.data;
}

export async function getCliente(id: string): Promise<Cliente> {
    const response = await http.get(`/clientes/${id}`);
    return response.data.data;
}

export async function crearCliente(datos: ClienteDatos): Promise<Cliente> {
    const response = await http.post('/clientes', datos);
    return response.data.data;
}

export async function actualizarCliente(id: string, datos: ClienteDatos): Promise<Cliente> {
    const response = await http.put(`/clientes/${id}`, datos);
    return response.data.data;
}

export async function eliminarCliente(id: string): Promise<void> {
    await http.delete(`/clientes/${id}`);
}
