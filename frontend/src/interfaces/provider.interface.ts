import { User } from '@/types/auth.types';

export interface AuthProviderProps {
    user: User | undefined;
    children: React.ReactNode;
}
