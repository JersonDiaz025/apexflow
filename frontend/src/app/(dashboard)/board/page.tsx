import Link from 'next/link';
// import AppLayout from '@/layouts/AppLayout';
// import { getBoardsAction } from '@/actions/board.actions';

export default async function HomePage() {
    // const boards = await getBoardsAction();

    // console.log(boards);

    return (
        // <div>
        //     <h1>Boards</h1>

        //     {boards.map((board) => (
        //         <Link key={board.id} href={`/board/${board.id}`}>
        //             {board.title}
        //         </Link>
        //     ))}
        // </div>
        <>
            <h1>Kanban Board</h1>
        </>
    );
}
