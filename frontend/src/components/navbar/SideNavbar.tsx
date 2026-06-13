import { LayoutDashboard, KanbanSquare, CheckSquare, Users, BarChart3, Plus } from 'lucide-react';

const SideNavbar = () => {
    const menuItems = [
        {
            icon: LayoutDashboard,
            label: 'Dashboard',
            active: false,
        },
        {
            icon: KanbanSquare,
            label: 'Projects',
            active: true,
        },
        {
            icon: CheckSquare,
            label: 'Tasks',
            active: false,
        },
        {
            icon: Users,
            label: 'Team',
            active: false,
        },
        {
            icon: BarChart3,
            label: 'Reports',
            active: false,
        },
    ];

    return (
        <aside className='w-64 border-r border-outline-variant bg-white flex flex-col h-full sticky top-0'>
            <div className='p-6 flex items-center gap-3'>
                <div className='w-8 h-8 bg-primary rounded-precision flex items-center justify-center text-white font-bold'>
                    A
                </div>

                <span className='font-bold tracking-tight text-on-surface'>ApexFlow</span>
            </div>

            <nav className='flex-1 px-4 py-2 space-y-1'>
                <div className='text-xs font-bold text-on-surface-variant uppercase tracking-wider px-2 py-4'>
                    Workspace
                </div>

                {menuItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.label}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-precision transition-colors ${
                                item.active
                                    ? 'bg-surface-container-low text-primary font-semibold'
                                    : 'text-on-surface-variant hover:bg-surface-container-lowest'
                            }`}
                        >
                            <Icon size={20} />
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            <div className='p-4 border-t border-outline-variant'>
                <button className='w-full bg-primary text-white py-2.5 rounded-precision font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2'>
                    <Plus size={18} />
                    New Project
                </button>
            </div>
        </aside>
    );
};

export default SideNavbar;
