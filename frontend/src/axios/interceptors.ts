import { ApiError } from '@/types/auth.types';
import { logout } from '@/actions/auth/logout-action';
import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

export const setupInterceptors = (api: AxiosInstance): AxiosInstance => {
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
