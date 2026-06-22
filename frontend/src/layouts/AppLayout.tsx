'use client';
import { Suspense } from 'react';
import TopNavbar from '@/components/navbar/TopNavbar';
import BottomNavbar from '@/components/navigation/BottomNavbar';
import { useModalStore } from '@/store/modal.store';

interface AppLayoutProps {
    children: React.ReactNode;
}

export interface BoardMember {
    id: string;
    name: string;
    avatar: string;
}

export const MOCK_MEMBERS: BoardMember[] = [
    {
        id: 'mem-1',
        name: 'Jerson Ramos',
        avatar: 'JR',
    },
    {
        id: 'mem-2',
        name: 'Carlos Mendoza',
        avatar: 'CM',
    },
    {
        id: 'mem-3',
        name: 'Ana Alcántara',
        avatar: 'AA',
    },
    {
        id: 'mem-4',
        name: 'David Ortiz',
        avatar: 'DO',
    },
    {
        id: 'mem-5',
        name: 'Elena Rostova',
        avatar: 'ER',
    },
    {
        id: 'mem-6',
        name: 'Bryan De La Cruz',
        avatar: 'BC',
    },
    {
        id: 'mem-7',
        name: 'Fiona Gallagher',
        avatar: 'FG',
    },
];

export default function AppLayout({ children }: AppLayoutProps) {
    const onOpen = useModalStore((state) => state.onOpen);
    return (
        <div className='flex h-screen bg-surface overflow-hidden w-full'>
            <div className='flex-1 flex flex-col min-w-0 h-full relative pb-16 md:pb-0'>
                {/* <TopNavbar /> */}
                <TopNavbar
                    showBtnAdd
                    showSearch
                    title='ApexFlow'
                    showMembers={false}
                    handleOpenModal={onOpen}
                    searchPlaceholder='Buscar espacios de trabajo...'
                />
                {/* <TopNavbar
                    title='Product Roadmap'
                    showSearch
                    showMembers
                    showNotifications
                    members={MOCK_MEMBERS}
                    onAddMemberClick={() => {}}
                    handleOpenModal={onOpen}
                    searchPlaceholder='Search roadmap...'
                /> */}

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
