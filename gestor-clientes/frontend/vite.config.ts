import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
    plugins: [react()],
    resolve: {
        // Permite importar con "@/..." en lugar de "../../"
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        port: 5173,
        // Redirige /api al backend
        proxy: {
            '/api': 'http://localhost:3001',
        },
    },
});
