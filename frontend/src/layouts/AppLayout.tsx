'use client';

import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { useModalStore } from '@/store/modal.store';
import { ROUTES } from '@/constants/routes.constant';
import TopNavbar from '@/components/navbar/TopNavbar';
import BottomNavbar from '@/components/navigation/BottomNavbar';
import { MODAL_TYPES } from '@/constants/modal-types.constants';

interface AppLayoutProps {
    children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    const pathname = usePathname();
    const isGlobalDashboard = pathname === ROUTES.BOARDS;
    const onOpen = useModalStore((state) => state.onOpen);
    return (
        <div className='flex h-screen bg-surface overflow-hidden w-full'>
            <div className='flex-1 flex flex-col min-w-0 h-full relative pb-16 md:pb-0'>
                {isGlobalDashboard ? (
                    <TopNavbar
                        showBtnAdd
                        showSearch
                        title='ApexFlow'
                        showMembers={false}
                        handleOpenModal={onOpen}
                        searchPlaceholder='Buscar espacios de trabajo...'
                    />
                ) : (
                    <TopNavbar
                        title='Product Roadmap'
                        showSearch
                        showMembers
                        showNotifications
                        members={[]}
                        handleOpenModal={onOpen}
                        searchPlaceholder='Buscar...'
                        onAddMemberClick={() => onOpen(MODAL_TYPES.INVITE_USER)}
                    />
                )}

                <Suspense fallback={<div className='flex-1 bg-background' />}>
                    <main className='flex-1 overflow-y-auto overflow-x-auto p-4 md:p-8'>
                        {children}
                    </main>
                </Suspense>
                <div className='block md:hidden w-full absolute bottom-0 left-0 z-40'>
                    <BottomNavbar handleOpenModal={onOpen} />
                </div>
            </div>
        </div>
    );
}
