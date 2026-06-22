'use client';

import Link from 'next/link';
import LayoutPages from '@/layouts/LayoutPages';
import { ROUTES } from '@/constants/routes.constant';
import { useBreadcrumb } from '@/hooks/use-breadcrumb';
import BoardCard from '@/features/boards/components/BoardCard';
import { BoardsPageProps } from '@/features/boards/interfaces/board.interfaces';

const BoardsPage = ({ data }: BoardsPageProps) => {
    const items = [{ label: 'Mis tableros', href: ROUTES.BOARDS }];
    const breadcrumbItems = useBreadcrumb(items);

    return (
        <LayoutPages
            title='Mis tableros'
            subTitle='Gestiona tus espacios de trabajo, realiza el seguimiento de tus tareas y colabora con tu equipo en ApexFlow.'
            breadcrumbItems={breadcrumbItems}
        >
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 px-1'>
                {data.map((board) => (
                    <Link key={board.id} href={ROUTES.BOARD_DETAIL(board.id)}>
                        <BoardCard
                            id={board.id}
                            title={board.title}
                            description={board.description}
                            totalColumns={board?.totalColumns ?? 0}
                            totalTasks={board.totalTasks ?? 0}
                            members={board?.members ?? []}
                        />
                    </Link>
                ))}
            </div>
        </LayoutPages>
    );
};

export default BoardsPage;
