'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { logout } from '@/app/(auth)/logout/route';
import { profileService } from '@/services/user/profile.service';
import { PUBLIC_ROUTES } from '@/constants/routes.constant';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { user, setUser } = useAuthStore();

    // Un useRef nos ayuda a evitar que si el componente se re-renderiza rápido,
    // se dupliquen las llamadas fetch al mismo tiempo.
    // const isFetching = useRef(false);

    // useEffect(() => {
    //     // Si es una ruta pública (/login, /register), no buscamos perfil
    //     if (PUBLIC_ROUTES.includes(pathname)) {
    //         return;
    //     }

    //     // Si ya tenemos el usuario en el store o ya estamos haciendo un fetch, nos detenemos
    //     if (user || isFetching.current) return;

    //     const fetchUserProfile = async () => {
    //         isFetching.current = true;
    //         try {
    //             const userData = await profileService.getFullProfile();
    //             setUser(userData || null);
    //         } catch (error) {
    //             console.error('Error cargando el perfil, forzando logout:', error);
    //             setUser(null);
    //             await logout();
    //         } finally {
    //             isFetching.current = false;
    //         }
    //     };

    //     fetchUserProfile();

    //     // Quitamos 'user' de las dependencias.
    //     // El efecto solo volverá a evaluar si el 'pathname' cambia.
    // }, [pathname, setUser]);

    return <>{children}</>;
}
