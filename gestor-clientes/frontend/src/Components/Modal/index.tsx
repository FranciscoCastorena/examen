import type { CSSProperties, ReactNode } from 'react';

interface ModalProps {
    titulo: string;
    onCerrar: () => void;
    children: ReactNode;
}

export default function Modal({ titulo, onCerrar, children }: ModalProps) {
    return (
        <div style={styles.fondo}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <h2 style={styles.titulo}>{titulo}</h2>
                    <button style={styles.botonCerrar} onClick={onCerrar}>
                        ✕
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}

const styles: Record<string, CSSProperties> = {
    fondo: {
        position: 'fixed',
        inset: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    modal: {
        width: '100%',
        maxWidth: 450,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    titulo: {
        margin: 0,
        fontSize: 18,
    },
    botonCerrar: {
        border: 'none',
        background: 'none',
        fontSize: 18,
        color: '#666',
        cursor: 'pointer',
    },
};
