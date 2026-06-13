// import Image from 'next/image';
import { Search, Bell, Settings, UserPlus, History } from 'lucide-react';

interface TopNavbarProps {
    title?: string;
}

const TopNavbar = ({ title = 'Product Roadmap' }: TopNavbarProps) => {
    return (
        <header className='h-16 border-b border-outline-variant bg-white/80 backdrop-blur-md flex items-center justify-between px-4 md:px-8 sticky top-0 z-30 w-full'>
            {/* Lado Izquierdo: Título y Miembros */}
            <div className='flex items-center gap-3 md:gap-6 min-w-0'>
                <div className='flex items-center gap-2 min-w-0'>
                    <h1 className='text-lg md:text-xl font-bold text-on-surface truncate'>
                        {title}
                    </h1>
                    <button className='text-on-surface-variant hover:text-primary transition-colors flex-shrink-0'>
                        <History size={18} />
                    </button>
                </div>

                {/* Oculto en mobile, visible de tablet en adelante */}
                <div className='hidden md:flex items-center gap-4'>
                    <div className='flex -space-x-2'>
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className='w-8 h-8 rounded-full bg-surface-container-high border-2 border-white flex-shrink-0'
                            />
                        ))}
                        <div className='w-8 h-8 rounded-full bg-surface-container-high border-2 border-white flex items-center justify-center text-xs font-bold text-on-surface-variant flex-shrink-0'>
                            +4
                        </div>
                    </div>

                    <button className='text-on-surface-variant hover:text-primary transition-colors'>
                        <UserPlus size={20} />
                    </button>
                </div>
            </div>

            {/* Lado Derecho: Acciones y Perfil */}
            <div className='flex items-center gap-2 md:gap-4'>
                {/* Buscador: Solo visible en pantallas medianas/grandes */}
                <div className='relative hidden md:block'>
                    <Search
                        size={18}
                        className='absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant'
                    />
                    <input
                        type='text'
                        placeholder='Search roadmap...'
                        className='pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-precision focus:outline-none focus:ring-2 focus:ring-primary/20 w-64'
                    />
                </div>

                {/* Notificaciones (Siempre visible) */}
                <button className='p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors relative'>
                    <Bell size={20} />
                    <span className='absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white' />
                </button>

                {/* Ajustes (Visible también en mobile según tu captura) */}
                <button className='p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors'>
                    <Settings size={20} />
                </button>

                {/* Avatar de Usuario (Siempre visible) */}
                <div className='w-8 h-8 rounded-full bg-surface-container-high border border-outline-variant flex-shrink-0' />
            </div>
        </header>
    );
};

export default TopNavbar;
