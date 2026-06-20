import { apiServer } from '@/axios/api-server';
import { API_ENDPOINTS } from '@/constants/routes.constant';
import { LoginDto, RegisterDto, AuthResponse, User } from '@/types/auth.types';

export const authService = {
    getProfile: (): Promise<User> => apiServer.get(API_ENDPOINTS.AUTH.PROFILE),
    login: (data: LoginDto): Promise<AuthResponse> =>
        apiServer.post(API_ENDPOINTS.AUTH.LOGIN, data),
    register: (data: RegisterDto): Promise<AuthResponse> =>
        apiServer.post(API_ENDPOINTS.AUTH.REGISTER, data),
};
