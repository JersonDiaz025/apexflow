'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { LogOut, User as UserIcon } from 'lucide-react';

export default function UserDropdown() {
    const { user } = useAuthStore();
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

    const handleLogout = async () => {
        // Aquí ejecutas la destrucción de la cookie y limpias Zustand
        // Ejemplo: await logoutAction();
        window.location.href = '/login';
    };

    return (
        <div className='relative' ref={dropdownRef}>
            {/* Botón del Avatar */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className='w-9 h-9 rounded-full bg-primary text-white border border-outline-variant flex items-center justify-center font-bold text-sm shadow-sm hover:scale-105 transition-transform uppercase focus:outline-none'
            >
                {user.avatar || '??'}
            </button>

            {/* Menú Flotante Dropdown */}
            {isOpen && (
                <div className='absolute right-0 mt-2 w-64 bg-white border border-outline-variant rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150'>
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
                    <div className='p-1'>
                        <a
                            href='/profile'
                            className='flex items-center gap-2 px-3 py-2 text-sm text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface rounded-lg transition-colors'
                        >
                            <UserIcon size={16} />
                            <span>Mi Perfil</span>
                        </a>

                        <button
                            onClick={handleLogout}
                            className='w-full flex items-center gap-2 px-3 py-2 text-sm text-error hover:bg-error/10 rounded-lg transition-colors font-medium mt-1'
                        >
                            <LogOut size={16} />
                            <span>Cerrar Sesión</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
