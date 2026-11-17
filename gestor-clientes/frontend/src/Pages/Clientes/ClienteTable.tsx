import type { CSSProperties } from 'react';
import type { Cliente } from './types';

interface ClienteTableProps {
    clientes: Cliente[];
    onEditar: (cliente: Cliente) => void; // la define Index.tsx
    onEliminar: (cliente: Cliente) => void; // la define Index.tsx
}

// Muestra la lista de clientes; las acciones se avisan a Index.tsx
export default function ClienteTable({ clientes, onEditar, onEliminar }: ClienteTableProps) {
    return (
        <div style={styles.contenedor}>
            <table style={styles.tabla}>
                <thead>
                    <tr>
                        <th style={styles.th}>Nombre completo</th>
                        <th style={styles.th}>Email</th>
                        <th style={styles.th}>Teléfono</th>
                        <th style={styles.th}>Empresa</th>
                        <th style={styles.th}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Una fila por cliente; key ayuda a React a identificar cada fila. "-" si no tiene teléfono */}
                    {clientes.map((cliente) => (
                        <tr key={cliente.id}>
                            <td style={styles.td}>{cliente.nombre_completo}</td>
                            <td style={styles.td}>{cliente.email}</td>
                            <td style={styles.td}>{cliente.telefono || '-'}</td>
                            <td style={styles.td}>{cliente.empresa}</td>
                            <td style={styles.td}>
                                <button style={styles.botonEditar} onClick={() => onEditar(cliente)}>
                                    Editar
                                </button>
                                <button style={styles.botonEliminar} onClick={() => onEliminar(cliente)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const celda: CSSProperties = {
    padding: '12px 14px',
    textAlign: 'left',
    borderBottom: '1px solid #eee',
    whiteSpace: 'nowrap',
};

const botonAccion: CSSProperties = {
    padding: '5px 10px',
    marginRight: 6,
    border: '1px solid #ccc',
    borderRadius: 5,
    backgroundColor: 'white',
    fontSize: 13,
    fontFamily: 'inherit',
    cursor: 'pointer',
};

const styles: Record<string, CSSProperties> = {
    // overflowX permite desplazar la tabla en pantallas pequeñas
    contenedor: {
        overflowX: 'auto',
        backgroundColor: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: 8,
    },
    tabla: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    th: {
        ...celda,
        backgroundColor: '#fafafa',
        fontSize: 13,
        color: '#666',
    },
    td: celda,
    botonEditar: botonAccion,
    botonEliminar: {
        ...botonAccion,
        color: '#c0392b',
        borderColor: '#e6b0aa',
    },
};
