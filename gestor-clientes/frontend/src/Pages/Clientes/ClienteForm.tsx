import { useState, type ChangeEvent, type CSSProperties, type FormEvent } from 'react';
import type { Cliente, ClienteDatos } from './types';
import { validarCliente, type ErroresCliente } from './validaciones';

interface ClienteFormProps {
    cliente: Cliente | null; // null = nuevo cliente
    onGuardar: (datos: ClienteDatos) => Promise<void>;
    onCancelar: () => void;
}

const formularioVacio: ClienteDatos = {
    nombre_completo: '',
    email: '',
    telefono: '',
    empresa: '',
};

export default function ClienteForm({ cliente, onGuardar, onCancelar }: ClienteFormProps) {
    // Si se está editando, el formulario empieza con los datos del cliente
    const [datos, setDatos] = useState<ClienteDatos>(
        cliente
            ? {
                  nombre_completo: cliente.nombre_completo,
                  email: cliente.email,
                  telefono: cliente.telefono ?? '', // el input no acepta null
                  empresa: cliente.empresa,
              }
            : formularioVacio,
    );
    const [errores, setErrores] = useState<ErroresCliente>({}); // errores de cada campo
    const [errorServidor, setErrorServidor] = useState(''); // error que devuelve el backend
    const [guardando, setGuardando] = useState(false);

    // Actualiza solo el campo que cambió, usando el "name" del input
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setDatos({ ...datos, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault(); // evita que la página se recargue
        setErrorServidor('');

        // Si hay errores de validación, no se envía nada al backend
        const nuevosErrores = validarCliente(datos);
        setErrores(nuevosErrores);
        if (Object.keys(nuevosErrores).length > 0) return;

        setGuardando(true);
        try {
            await onGuardar(datos);
            setDatos(formularioVacio); // limpiar formulario
        } catch (err) {
            // Por ejemplo: "Ya existe un cliente con ese email"
            setErrorServidor((err as Error).message);
        } finally {
            setGuardando(false);
        }
    }

    // noValidate: desactiva la validación del navegador, se usa la nuestra
    return (
        <form onSubmit={handleSubmit} noValidate>
            {/* Error que devolvió el backend, por ejemplo email repetido */}
            {errorServidor && <div style={styles.alertaError}>{errorServidor}</div>}

            {/* El "name" de cada input debe coincidir con el campo de datos (lo usa handleChange) */}
            <div style={styles.campo}>
                <label htmlFor="nombre_completo" style={styles.label}>
                    Nombre completo *
                </label>
                <input
                    id="nombre_completo"
                    name="nombre_completo"
                    value={datos.nombre_completo}
                    onChange={handleChange}
                    style={errores.nombre_completo ? styles.inputError : styles.input}
                />
                {errores.nombre_completo && <span style={styles.error}>{errores.nombre_completo}</span>}
            </div>

            <div style={styles.campo}>
                <label htmlFor="email" style={styles.label}>
                    Email *
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={datos.email}
                    onChange={handleChange}
                    style={errores.email ? styles.inputError : styles.input}
                />
                {errores.email && <span style={styles.error}>{errores.email}</span>}
            </div>

            <div style={styles.campo}>
                <label htmlFor="telefono" style={styles.label}>
                    Teléfono
                </label>
                <input
                    id="telefono"
                    name="telefono"
                    value={datos.telefono}
                    onChange={handleChange}
                    style={styles.input}
                />
            </div>

            <div style={styles.campo}>
                <label htmlFor="empresa" style={styles.label}>
                    Empresa *
                </label>
                <input
                    id="empresa"
                    name="empresa"
                    value={datos.empresa}
                    onChange={handleChange}
                    style={errores.empresa ? styles.inputError : styles.input}
                />
                {errores.empresa && <span style={styles.error}>{errores.empresa}</span>}
            </div>

            <div style={styles.botones}>
                <button type="button" style={styles.botonSecundario} onClick={onCancelar}>
                    Cancelar
                </button>
                {/* Se desactiva mientras se guarda para evitar doble envío */}
                <button type="submit" style={styles.botonPrimario} disabled={guardando}>
                    {guardando ? 'Guardando...' : 'Guardar'}
                </button>
            </div>
        </form>
    );
}

const input: CSSProperties = {
    width: '100%',
    padding: '9px 12px',
    border: '1px solid #ccc',
    borderRadius: 6,
    fontSize: 14,
    fontFamily: 'inherit',
    boxSizing: 'border-box',
};

const boton: CSSProperties = {
    padding: '9px 16px',
    border: 'none',
    borderRadius: 6,
    fontSize: 14,
    fontFamily: 'inherit',
    cursor: 'pointer',
};

const styles: Record<string, CSSProperties> = {
    campo: {
        marginBottom: 14,
    },
    label: {
        display: 'block',
        marginBottom: 5,
        fontSize: 14,
        fontWeight: 600,
    },
    input,
    inputError: {
        ...input,
        borderColor: '#c0392b',
    },
    error: {
        display: 'block',
        marginTop: 4,
        fontSize: 13,
        color: '#c0392b',
    },
    alertaError: {
        padding: '10px 14px',
        marginBottom: 16,
        borderRadius: 6,
        fontSize: 14,
        backgroundColor: '#fdecea',
        color: '#c0392b',
        border: '1px solid #f5c6c0',
    },
    botones: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 8,
        marginTop: 20,
    },
    botonPrimario: {
        ...boton,
        backgroundColor: '#2f5bd3',
        color: 'white',
    },
    botonSecundario: {
        ...boton,
        backgroundColor: 'white',
        border: '1px solid #ccc',
    },
};
