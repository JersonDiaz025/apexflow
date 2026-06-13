import SideNavbar from '@/components/navbar/SideNavbar';
import TopNavbar from '@/components/navbar/TopNavbar';
import BottomNavbar from '@/components/navbar/BottomNavbar';

interface AppLayoutProps {
    children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className='flex h-screen bg-surface overflow-hidden w-full'>
            {/* Solo visible de Tablet (md) en adelante */}
            <div className='hidden md:block h-full'>
                <SideNavbar />
            </div>

            <div className='flex-1 flex flex-col min-w-0 h-full relative pb-16 md:pb-0'>
                <TopNavbar />

                {/* Padding dinámico para mobile por la barra inferior */}
                <main className='flex-1 overflow-y-auto overflow-x-auto p-4 md:p-8'>
                    {children}
                </main>

                {/* Solo visible en pantallas pequeñas (menores a md) */}
                <div className='block md:hidden w-full absolute bottom-0 left-0 z-40'>
                    <BottomNavbar />
                </div>
            </div>
        </div>
    );
}
