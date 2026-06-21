// ========================
// AUTH DTOs (Frontend)
// ========================

export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    name: string;
    email: string;
    password: string;
}

// ========================
// USER (SAFE FRONTEND MODEL)
// ========================

export interface User {
    id: string;
    avatar?: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

// ========================
// AUTH RESPONSE (Backend contract)
// ========================

export interface AuthResponse {
    token: string;
    success?: boolean;
    message?: string;
    user?: User;
}

// ========================
// AUTH STATE (Zustand / Context)
// ========================

export type AuthState = {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    setUser: (user: User | null) => void;
    logout: () => void;
};

// ========================
// API ERROR
// ========================

export interface ApiError {
    message: string | string[];
    status?: number;
    errors?: Record<string, string[]>;
}
