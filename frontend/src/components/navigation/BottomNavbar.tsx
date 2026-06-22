import { AddButton } from '@/components';
import { Home, KanbanSquare, Users, User } from 'lucide-react';
import { MODAL_TYPES } from '@/constants/modal-types.constants';
import { BottonNavbarProps } from '@/interfaces/navbar.interface';

const BottomNavbar = ({ handleOpenModal }: BottonNavbarProps) => {
    const navItems = [
        { icon: Home, label: 'Home', active: false },
        { icon: KanbanSquare, label: 'Board', active: true },
        { icon: null, label: 'FAB_PLACEHOLDER', active: false }, // Espacio para el botón flotante
        { icon: Users, label: 'Team', active: false },
        { icon: User, label: 'Profile', active: false },
    ];

    return (
        <div className='relative bg-white border-t border-outline-variant h-16 flex items-center justify-around px-2 shadow-lg w-full'>
            {navItems.map((item, idx) => {
                if (item.label === 'FAB_PLACEHOLDER') {
                    return (
                        <div key={idx} className='relative -top-5 z-50'>
                            <AddButton
                                onClick={() => handleOpenModal(MODAL_TYPES.CREATE_BOARD)}
                                iconSize={24}
                            />
                        </div>
                    );
                }

                const Icon = item.icon;

                return (
                    <button
                        key={item.label}
                        className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
                            item.active ? 'text-primary' : 'text-on-surface-variant'
                        }`}
                    >
                        {Icon && (
                            <Icon
                                size={20}
                                className={item.active ? 'stroke-[2.5px]' : 'stroke-[2px]'}
                            />
                        )}
                        <span className='text-[10px] mt-1 font-medium tracking-tight'>
                            {item.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};

export default BottomNavbar;
