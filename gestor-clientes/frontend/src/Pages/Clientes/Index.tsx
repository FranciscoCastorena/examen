import { useEffect, useState, type CSSProperties } from 'react';
import Modal from '@/Components/Modal';
import Paginacion from '@/Components/Paginacion';
import { actualizarCliente, crearCliente, eliminarCliente, getClientes } from '@/Utils/Api/clientes';
import ClienteForm from './ClienteForm';
import ClienteTable from './ClienteTable';
import type { Cliente, ClienteDatos } from './types';

interface Mensaje {
    tipo: 'exito' | 'error';
    texto: string;
}

const CLIENTES_POR_PAGINA = 10;

export default function ClientesIndex() {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    const [busqueda, setBusqueda] = useState('');
    const [modalAbierto, setModalAbierto] = useState(false);
    const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);
    const [mensaje, setMensaje] = useState<Mensaje | null>(null);
    const [pagina, setPagina] = useState(1);

    // Cargar clientes desde la API
    async function cargarClientes() {
        setCargando(true);
        setError('');
        try {
            const data = await getClientes();
            setClientes(data);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setCargando(false);
        }
    }

    useEffect(() => {
        cargarClientes();
    }, []);

    // Muestra un mensaje durante 3 segundos
    function mostrarMensaje(tipo: Mensaje['tipo'], texto: string) {
        setMensaje({ tipo, texto });
        setTimeout(() => setMensaje(null), 3000);
    }

    function abrirNuevo() {
        setClienteEditando(null);
        setModalAbierto(true);
    }

    function abrirEditar(cliente: Cliente) {
        setClienteEditando(cliente);
        setModalAbierto(true);
    }

    function cerrarModal() {
        setModalAbierto(false);
        setClienteEditando(null);
    }

    async function guardarCliente(datos: ClienteDatos) {
        if (clienteEditando) {
            await actualizarCliente(clienteEditando.id, datos);
            mostrarMensaje('exito', 'Cliente actualizado correctamente');
        } else {
            await crearCliente(datos);
            mostrarMensaje('exito', 'Cliente creado correctamente');
            setPagina(1); // el cliente nuevo aparece al principio de la lista
        }
        cerrarModal();
        cargarClientes();
    }

    async function borrarCliente(cliente: Cliente) {
        if (!window.confirm(`¿Seguro que deseas eliminar a ${cliente.nombre_completo}?`)) return;

        try {
            await eliminarCliente(cliente.id);
            mostrarMensaje('exito', 'Cliente eliminado correctamente');
        } catch (err) {
            mostrarMensaje('error', (err as Error).message);
        }
        cargarClientes();
    }

    // Filtrar por nombre, email o empresa
    const texto = busqueda.toLowerCase();
    const clientesFiltrados = clientes.filter(
        (c) =>
            c.nombre_completo.toLowerCase().includes(texto) ||
            c.email.toLowerCase().includes(texto) ||
            c.empresa.toLowerCase().includes(texto),
    );

    // Paginación: se muestran solo los clientes de la página actual
    const totalPaginas = Math.max(1, Math.ceil(clientesFiltrados.length / CLIENTES_POR_PAGINA));
    const paginaActual = Math.min(pagina, totalPaginas); // por si se borró el último cliente de la última página
    const inicio = (paginaActual - 1) * CLIENTES_POR_PAGINA;
    const clientesPagina = clientesFiltrados.slice(inicio, inicio + CLIENTES_POR_PAGINA);

    return (
        <div style={styles.contenedor}>
            <header style={styles.header}>
                <h1 style={styles.titulo}>Gestor de Clientes</h1>
                <button style={styles.botonNuevo} onClick={abrirNuevo}>
                    + Nuevo cliente
                </button>
            </header>

            {mensaje && (
                <div style={mensaje.tipo === 'exito' ? styles.alertaExito : styles.alertaError}>
                    {mensaje.texto}
                </div>
            )}

            <input
                style={styles.buscador}
                type="text"
                placeholder="Buscar por nombre, email o empresa"
                value={busqueda}
                onChange={(e) => {
                    setBusqueda(e.target.value);
                    setPagina(1); // al buscar, volver a la primera página
                }}
            />

            {cargando && <p style={styles.estado}>Cargando clientes...</p>}

            {!cargando && error && (
                <div style={styles.estado}>
                    <p style={styles.textoError}>{error}</p>
                    <button style={styles.botonReintentar} onClick={cargarClientes}>
                        Reintentar
                    </button>
                </div>
            )}

            {!cargando && !error && clientes.length === 0 && (
                <p style={styles.estado}>No hay clientes registrados.</p>
            )}

            {!cargando && !error && clientes.length > 0 && clientesFiltrados.length === 0 && (
                <p style={styles.estado}>No se encontraron clientes con esa búsqueda.</p>
            )}

            {!cargando && !error && clientesFiltrados.length > 0 && (
                <>
                    <ClienteTable clientes={clientesPagina} onEditar={abrirEditar} onEliminar={borrarCliente} />
                    <Paginacion
                        paginaActual={paginaActual}
                        totalPaginas={totalPaginas}
                        totalRegistros={clientesFiltrados.length}
                        porPagina={CLIENTES_POR_PAGINA}
                        onCambiarPagina={setPagina}
                    />
                </>
            )}

            {modalAbierto && (
                <Modal titulo={clienteEditando ? 'Editar cliente' : 'Nuevo cliente'} onCerrar={cerrarModal}>
                    <ClienteForm cliente={clienteEditando} onGuardar={guardarCliente} onCancelar={cerrarModal} />
                </Modal>
            )}
        </div>
    );
}

const alerta: CSSProperties = {
    padding: '10px 14px',
    marginBottom: 16,
    borderRadius: 6,
    fontSize: 14,
};

const styles: Record<string, CSSProperties> = {
    contenedor: {
        maxWidth: 1100,
        margin: '0 auto',
        padding: '24px 16px',
    },
    // flexWrap hace que el botón baje si no hay espacio (móvil)
    header: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    titulo: {
        margin: 0,
        fontSize: 22,
    },
    botonNuevo: {
        padding: '9px 16px',
        border: 'none',
        borderRadius: 6,
        backgroundColor: '#2f5bd3',
        color: 'white',
        fontSize: 14,
        fontFamily: 'inherit',
        cursor: 'pointer',
    },
    buscador: {
        width: '100%',
        maxWidth: 400,
        padding: '9px 12px',
        marginBottom: 16,
        border: '1px solid #ccc',
        borderRadius: 6,
        fontSize: 14,
        fontFamily: 'inherit',
        boxSizing: 'border-box',
    },
    estado: {
        padding: '40px 0',
        textAlign: 'center',
        color: '#666',
    },
    textoError: {
        color: '#c0392b',
    },
    botonReintentar: {
        padding: '9px 16px',
        border: '1px solid #ccc',
        borderRadius: 6,
        backgroundColor: 'white',
        fontFamily: 'inherit',
        cursor: 'pointer',
    },
    alertaExito: {
        ...alerta,
        backgroundColor: '#e8f6ee',
        color: '#1e7d46',
        border: '1px solid #b6e2c6',
    },
    alertaError: {
        ...alerta,
        backgroundColor: '#fdecea',
        color: '#c0392b',
        border: '1px solid #f5c6c0',
    },
};
