'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbProps } from '@/interfaces/breadcrumb.interface';

export function Breadcrumb({ items }: BreadcrumbProps) {
    // Si no se le pasan items, por defecto mostramos que está en el Inicio
    if (!items || items.length === 0) return null;

    return (
        <nav
            aria-label='Breadcrumb'
            className='flex items-center text-sm font-medium text-gray-500 overflow-x-auto whitespace-nowrap py-1.5'
        >
            <ol className='flex items-center gap-2'>
                {/* Nodo Raíz Estático: Siempre empezamos en la raíz del panel */}
                <li>
                    <Link
                        href='/boards'
                        className='flex items-center gap-1.5 text-gray-400 hover:text-primary transition-colors duration-150 rounded-md focus:outline-none'
                    >
                        <Home size={15} />
                        <span className='hidden sm:inline'>Inicio</span>
                    </Link>
                </li>

                {/* Separador Inicial obligatorio */}
                <ChevronRight size={14} className='text-gray-300 flex-shrink-0' />

                {/* Iteramos sobre el array dinámico que nos pasa la página */}
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li key={`${item.label}-${index}`} className='flex items-center gap-2'>
                            {isLast || !item.href ? (
                                // Último elemento: Texto plano (Página actual en la que está parado)
                                <span className='text-gray-900 font-semibold flex items-center gap-1.5 select-none animate-in fade-in slide-in-from-left-1 duration-150'>
                                    {item.icon && (
                                        <item.icon size={15} className='text-primary/70' />
                                    )}
                                    {item.label}
                                </span>
                            ) : (
                                // Elemento intermedio: Enlace clickeable para regresar en el historial
                                <Link
                                    href={item.href}
                                    className='flex items-center gap-1.5 text-gray-500 hover:text-primary transition-colors duration-150 rounded-md focus:outline-none'
                                >
                                    {item.icon && <item.icon size={15} />}
                                    {item.label}
                                </Link>
                            )}

                            {/* Si no es el último, metemos la flecha divisoria */}
                            {!isLast && (
                                <ChevronRight size={14} className='text-gray-300 flex-shrink-0' />
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

export default Breadcrumb;
