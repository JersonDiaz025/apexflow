import { apiServer } from '@/axios/api-server';
import { FULL_LOGIN, FULL_REGISTER, ROUTES } from '@/constants/routes.constant';
import { LoginDto, RegisterDto, AuthResponse, User } from '@/types/auth.types';

export const authService = {
    getProfile: (): Promise<User> => apiServer.get(ROUTES.PROFILE),
    login: (data: LoginDto): Promise<AuthResponse> => apiServer.post(FULL_LOGIN, data),
    register: (data: RegisterDto): Promise<AuthResponse> => apiServer.post(FULL_REGISTER, data),
};
