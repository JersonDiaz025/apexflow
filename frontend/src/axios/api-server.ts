import axios from 'axios';
import { setupRequestInterceptors } from '@/axios/interceptors';

export const apiServer = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:4000',
    headers: {
        'Content-Type': 'application/json',
    },
});

setupRequestInterceptors(apiServer);
