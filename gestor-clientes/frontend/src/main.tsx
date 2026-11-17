import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Crud from './App';

// Punto de entrada: React dibuja la aplicación dentro del <div id="root"> de index.html
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Crud />
    </StrictMode>,
);
