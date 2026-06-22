import { Props } from '@/interfaces/page.interface';
import { boardService } from '@/services/board/board.service';
import KanbanBoardPage from '@/features/kanban/pages/KanbanBoardPage';

export default async function BoardPage({ params }: Props) {
    const { id } = await params;
    const board = await boardService.getBoard(id);

    return <KanbanBoardPage board={board} />;
}
