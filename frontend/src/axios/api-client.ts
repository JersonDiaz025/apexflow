import axios from 'axios';
import { setupResponseInterceptors } from '@/axios/interceptors';

export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:4000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});
setupResponseInterceptors(apiClient);
