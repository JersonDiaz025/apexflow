'use client';

import { useState, useRef, useEffect, startTransition } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { LogOut, Settings, User as UserIcon } from 'lucide-react';
import { logout as logoutAction } from '@/actions/auth/logout-action';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes.constant';
import Button from './shared/Button';

export default function UserDropdown() {
    const { user, logout } = useAuthStore();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Cerrar el menú si se hace click fuera de él
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!user) {
        return <div className='w-8 h-8 rounded-full bg-surface-container-high animate-pulse' />;
    }

    const handleLogout = () => {
        setIsOpen(false);
        startTransition(async () => {
            logoutAction();
            logout?.();
        });
    };

    return (
        <div className='relative' ref={dropdownRef}>
            {/* Botón del Avatar */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className='w-9 cursor-pointer h-9 rounded-full bg-primary text-white border border-outline-variant flex items-center justify-center font-bold text-sm shadow-sm hover:scale-105 transition-transform uppercase focus:outline-none'
            >
                {user.avatar || '??'}
            </button>

            {/* Menú Flotante Dropdown */}
            {isOpen && (
                <div className='absolute right-0 mt-2 w-70 bg-white border border-outline-variant rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150'>
                    {/* Encabezado con Info del Usuario */}
                    <div className='px-4 py-3 border-b border-outline-variant/60'>
                        <p className='text-sm font-semibold text-on-surface truncate'>
                            {user.name}
                        </p>
                        <p className='text-xs text-on-surface-variant truncate mt-0.5'>
                            {user.email}
                        </p>
                    </div>

                    {/* Acciones */}
                    <div className='p-4 flex flex-col gap-2'>
                        <Link
                            className='flex items-center cursor-pointer gap-2 px-3 py-2 text-sm text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface rounded-lg transition-colors'
                            href={ROUTES.CONFIG}
                        >
                            <Settings size={19} />
                            <span>Configuraciones</span>
                        </Link>
                        <Link
                            href={ROUTES.PROFILE}
                            className='flex items-center cursor-pointer gap-2 px-3 py-2 text-sm text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface rounded-lg transition-colors'
                        >
                            <UserIcon size={19} />
                            <span>Mi Perfil</span>
                        </Link>

                        <Button
                            onClick={handleLogout}
                            className='w-full bg-red-600 flex rounded-md cursor-pointer items-center gap-2 px-3 py-2 text-sm text-error hover:bg-error/10 transition-colors font-medium mt-1'
                        >
                            <LogOut size={19} />
                            <span>Cerrar Sesión</span>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
