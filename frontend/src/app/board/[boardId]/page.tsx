import { Props } from '@/interfaces/page.interface';
import { boardService } from '@/services/board.service';
import KanbanBoard from '@/components/kanban/KanbanBoard';

export default async function BoardPage({ params }: Props) {
    const { boardId } = await params;

    // const response = await boardService.getBoard(boardId);

    return <KanbanBoard initialBoard={[]} />;
}
