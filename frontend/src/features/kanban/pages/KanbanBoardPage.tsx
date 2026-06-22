'use client';

import LayoutPages from '@/layouts/LayoutPages';
import { useBreadcrumb } from '@/hooks/use-breadcrumb';

const KanbanBoardPage = ({ board }) => {
    console.log('Boards list', board);
    const boardName = 'Sprint 3 - Core API';
    const breadcrumbItems = useBreadcrumb();

    return (
        <LayoutPages
            title={boardName}
            subTitle=''
            breadcrumbItems={breadcrumbItems}
        >
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 px-1'>
                Mostrando detalle
            </div>
        </LayoutPages>
    );
};

export default KanbanBoardPage;
