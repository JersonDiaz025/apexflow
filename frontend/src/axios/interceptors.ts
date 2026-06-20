import { ApiError } from '@/types/auth.types';
import { logout } from '@/actions/auth/logout-action';
import { getAuthHeaders } from '@/utils/session.lib';
import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

// 1. Interceptor de Respuesta (Para el CLIENTE/Navegador)
export const setupResponseInterceptors = (api: AxiosInstance): AxiosInstance => {
    api.interceptors.response.use(
        <T>(response: AxiosResponse<T>) => response.data,

        async (error: AxiosError<ApiError>) => {
            const status = error.response?.status ?? error.response?.data?.statusCode;
            const message = error.response?.data?.message;

            if (status === 401 || message === 'SESSION_NOT_FOUND') {
                if (typeof window !== 'undefined') {
                    await logout();
                }
            }

            return Promise.reject(error);
        }
    );

    return api;
};

// 2. Interceptor de Requerimiento (Para el SERVIDOR / Server Actions)
export const setupRequestInterceptors = (api: AxiosInstance): AxiosInstance => {
    // Desempaquetamos la respuesta de forma simple en el servidor también
    api.interceptors.response.use(
        (response) => response.data,
        (error) => Promise.reject(error)
    );

    api.interceptors.request.use(async (config) => {
        const authHeaders = await getAuthHeaders();
        config.headers = Object.assign(config.headers ?? {}, authHeaders);
        return config;
    });

    return api;
};
