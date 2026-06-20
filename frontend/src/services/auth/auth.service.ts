import { api } from '@/axios/api';
import { FULL_LOGIN, FULL_REGISTER } from '@/constants/routes.constant';
import { LoginDto, RegisterDto, AuthResponse } from '@/types/auth.types';

export const AuthService = {
    login: (data: LoginDto): Promise<AuthResponse> => api.post(FULL_LOGIN, data),
    register: (data: RegisterDto): Promise<AuthResponse> => api.post(FULL_REGISTER, data),
};

export const authService = {
    login: (data: LoginDto): Promise<AuthResponse> => api.post(FULL_LOGIN, data),
    register: (data: RegisterDto): Promise<AuthResponse> => api.post(FULL_REGISTER, data),
    getProfile: (): Promise<UserProfile> => api.get('/auth/profile'),
};
