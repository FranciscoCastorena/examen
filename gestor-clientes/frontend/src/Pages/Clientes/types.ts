export interface Cliente {
    id: string;
    nombre_completo: string;
    email: string;
    telefono: string | null;
    empresa: string;
    createdAt: string;
    updatedAt: string;
}

// Datos que se escriben en el formulario
export interface ClienteDatos {
    nombre_completo: string;
    email: string;
    telefono: string;
    empresa: string;
}
