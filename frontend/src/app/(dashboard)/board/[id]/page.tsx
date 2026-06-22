import { Props } from '@/interfaces/page.interface';
import { boardService } from '@/services/board/board.service';
import KanbanBoardPage from '@/features/kanban/pages/KanbanBoardPage';
import { BoardSocketProvider } from '@/providers/socket-board.provider';

export default async function BoardPage({ params }: Props) {
    const { id } = await params;
    const boardData = await boardService.getBoard(id);

    return (
        <BoardSocketProvider boardId={id} initialData={boardData}>
            <KanbanBoardPage boardData={boardData} />
        </BoardSocketProvider>
    );
}
