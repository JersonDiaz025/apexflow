'use client';

import { useState } from 'react';
import LayoutPages from '@/layouts/LayoutPages';
import { ROUTES } from '@/constants/routes.constant';
import { useBreadcrumb } from '@/hooks/use-breadcrumb';
import MainKanban from '@/features/kanban/components/MainKanban';
import { BoardActions } from '@/features/kanban/components/BoardActions';
import { BoardPageProps } from '@/features/kanban/interfaces/board-page.interface';

const KanbanBoardPage = ({ boardData }: BoardPageProps) => {
    console.log('Boards detail', boardData);
    const currentTitle = boardData?.title;

    const [isActivityOpen, setIsActivityOpen] = useState(false);

    const MOCK_MEMBERS = [
        { id: 'u1', name: 'Jerson Cuevas', initial: 'J', bg: 'bg-pink-500' },
        { id: 'u2', name: 'Victor', initial: 'V', bg: 'bg-indigo-500' },
        { id: 'u3', name: 'Jhan Pierre', initial: 'P', bg: 'bg-emerald-500' },
    ];

    const items = useBreadcrumb([
        { label: 'Tableros', href: ROUTES.BOARDS },
        { label: currentTitle },
    ]);

    const breadcrumbItems = useBreadcrumb(items);

    return (
        <LayoutPages
            title={boardData.title}
            subTitle=''
            breadcrumbItems={breadcrumbItems}
            rightContent={
                <div className='flex w-full gap-2 justify-end'>
                    <BoardActions
                        members={MOCK_MEMBERS}
                        isActivityOpen={isActivityOpen}
                        setIsActivityOpen={setIsActivityOpen}
                    />
                </div>
            }
        >
            <MainKanban boardData={boardData} />
        </LayoutPages>
    );
};

export default KanbanBoardPage;
