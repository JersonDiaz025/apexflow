import { BoardsPage } from '@/features/boards';
import { getBoardsAction } from '@/actions/kanban/board.actions';

export default async function Page() {
    const data = await getBoardsAction();
    console.log(data);

    return <BoardsPage data={data} />;
}
