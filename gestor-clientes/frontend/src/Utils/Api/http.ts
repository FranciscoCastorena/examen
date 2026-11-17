import axios, { AxiosError, AxiosInstance } from 'axios';

class Http {
    private static _ax: AxiosInstance;
    static get ax(): AxiosInstance {
        if (!this._ax) {
            this._ax = axios.create({
                baseURL: '/api',
                timeout: 15000,
            });

            // Si el backend responde con error, se usa su "message" como mensaje del error
            this._ax.interceptors.response.use(
                (response) => response,
                (error: AxiosError<{ message?: string }>) => {
                    const message = error.response?.data?.message ?? 'No se pudo conectar con el servidor';
                    return Promise.reject(new Error(message));
                },
            );
        }
        return this._ax;
    }
}

export const http = Http.ax;
