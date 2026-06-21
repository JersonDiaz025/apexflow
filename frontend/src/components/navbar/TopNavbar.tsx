'use client';
import { useAuthStore } from '@/store/auth.store';
// import Image from 'next/image';
import { Bell, Settings, History } from 'lucide-react';
import { MemberGroup, SearchInput, UserDropdown, Title } from '@/components';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes.constant';

interface TopNavbarProps {
    title?: string;
    showSearch?: boolean;
    showMembers?: boolean;
    searchPlaceholder?: string;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    members?: Array<{ id: string; name: string; avatar?: string }>;
    onAddMemberClick?: () => void;
}

const TopNavbar = ({
    title = 'ApexFlow',
    showSearch = true,
    showMembers = false,
    searchPlaceholder = 'Buscar...',
    searchValue,
    onSearchChange,
    members,
    onAddMemberClick,
}: TopNavbarProps) => {
    const { user } = useAuthStore();
    console.log(user);
    return (
        <header className='h-16 border-b border-outline-variant bg-white/85 backdrop-blur-md flex items-center justify-between px-4 md:px-8 sticky top-0 z-30 w-full select-none'>
            {/* Lado Izquierdo: Título, Historial y Miembros */}
            <div className='flex items-center gap-4 md:gap-6 min-w-0'>
                <div className='flex items-center gap-2 min-w-0'>
                    <Link href={ROUTES.BOARDS}>
                        <Title
                            text={title}
                            className='text-base md:text-lg font-bold text-on-surface truncate'
                        />
                    </Link>
                </div>

                {/* Renderizado condicional controlado por propiedad */}
                {showMembers && (
                    <MemberGroup members={members} onAddMemberClick={onAddMemberClick} />
                )}
            </div>

            {/* Lado Derecho: Buscador, Notificaciones, Ajustes y Perfil */}
            <div className='flex items-center gap-1 md:gap-3'>
                {/* Buscador Condicional */}
                {showSearch && (
                    <SearchInput
                        placeholder={searchPlaceholder}
                        value={searchValue}
                        onChange={onSearchChange}
                    />
                )}

                {/* Notificaciones */}
                <button className='p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors relative'>
                    <Bell size={19} />
                    <span className='absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white' />
                </button>

                {/* Ajustes */}
                <button className='p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors'>
                    <Settings size={19} />
                </button>

                {/* Separador sutil */}
                <div className='h-6 w-[1px] bg-outline-variant/60 mx-1 hidden sm:block' />

                {/* Menú de Usuario con Zustand e Iniciales */}
                <UserDropdown />
            </div>
        </header>
    );
};

export default TopNavbar;
