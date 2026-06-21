import { Home, KanbanSquare, Users, User, Plus } from 'lucide-react';
import { Button, AddButton } from '@/components';

const BottomNavbar = () => {
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
                        /* Botón central "+" flotante */
                        <div key={`fab-${idx}`} className='relative -top-5 z-50'>
                            {/* Si no le pasas la prop icon, usará Plus automáticamente */}
                            <AddButton size={14} iconSize={26} onClick={() => {}} />
                        </div>
                    );
                }

                const Icon = item.icon;

                return (
                    <Button
                        key={item.label}
                        className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
                            item.active ? 'text-primary' : 'text-on-surface-variant'
                        }`}
                        icon={Icon}
                        iconSize={20}
                        size={10}
                        label={item.label}
                    />
                );
            })}
        </div>
    );
};

export default BottomNavbar;
