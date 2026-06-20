import axios from 'axios';
import { setupInterceptors } from '@/axios/interceptors';

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:4000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});
setupInterceptors(api);
