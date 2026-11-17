import type { CSSProperties } from 'react';

interface PaginacionProps {
    paginaActual: number;
    totalPaginas: number;
    totalRegistros: number;
    porPagina: number;
    onCambiarPagina: (pagina: number) => void;
}

export default function Paginacion({
    paginaActual,
    totalPaginas,
    totalRegistros,
    porPagina,
    onCambiarPagina,
}: PaginacionProps) {
    // Rango de registros que se están mostrando, ej: "11 - 20 de 52"
    const desde = (paginaActual - 1) * porPagina + 1;
    const hasta = Math.min(paginaActual * porPagina, totalRegistros);

    const esPrimera = paginaActual === 1;
    const esUltima = paginaActual === totalPaginas;

    return (
        <div style={styles.contenedor}>
            <span style={styles.texto}>
                {desde} - {hasta} de {totalRegistros}
            </span>

            <div style={styles.controles}>
                <button
                    style={esPrimera ? styles.botonDeshabilitado : styles.boton}
                    onClick={() => onCambiarPagina(paginaActual - 1)}
                    disabled={esPrimera}
                >
                    Anterior
                </button>
                <span style={styles.texto}>
                    Página {paginaActual} de {totalPaginas}
                </span>
                <button
                    style={esUltima ? styles.botonDeshabilitado : styles.boton}
                    onClick={() => onCambiarPagina(paginaActual + 1)}
                    disabled={esUltima}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
}

const boton: CSSProperties = {
    padding: '6px 12px',
    border: '1px solid #ccc',
    borderRadius: 5,
    backgroundColor: 'white',
    fontSize: 13,
    fontFamily: 'inherit',
    cursor: 'pointer',
};

const styles: Record<string, CSSProperties> = {
    // flexWrap hace que los controles bajen en pantallas pequeñas
    contenedor: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
    },
    controles: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
    },
    texto: {
        fontSize: 13,
        color: '#666',
    },
    boton,
    botonDeshabilitado: {
        ...boton,
        opacity: 0.5,
        cursor: 'not-allowed',
    },
};
