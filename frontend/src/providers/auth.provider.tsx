'use client';

import { useAuthStore } from '@/store/auth.store';
import { AuthProviderProps } from '@/interfaces/provider.interface';

export function AuthProvider({ user, children }: AuthProviderProps) {
    useAuthStore.setState({
        user,
        isAuthenticated: !!user,
        isLoading: false,
    });

    return <>{children}</>;
}
