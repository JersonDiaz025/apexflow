'use client';

import LayoutPages from '@/layouts/LayoutPages';
import { ROUTES } from '@/constants/routes.constant';
import { useBreadcrumb } from '@/hooks/use-breadcrumb';
import { BoardPageProps } from '@/features/kanban/interfaces/board-page.interface';
import MainKanban from '../components/MainKanban';

const KanbanBoardPage = ({ boardData }: BoardPageProps) => {
    console.log('Boards detail', boardData);
    const currentTitle = boardData?.title;

    const items = useBreadcrumb([
        { label: 'Tableros', href: ROUTES.BOARDS },
        { label: currentTitle },
    ]);

    const breadcrumbItems = useBreadcrumb(items);

    return (
        <LayoutPages title={boardData.title} subTitle='' breadcrumbItems={breadcrumbItems}>
            <MainKanban boardData={boardData} />
        </LayoutPages>
    );
};

export default KanbanBoardPage;
