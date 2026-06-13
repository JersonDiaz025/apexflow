import { BoardData } from '@/interfaces/kanban.interface';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

export async function fetchBoardData(boardId: string): Promise<BoardData> {
  const res = await fetch(`${BACKEND_URL}/kanban/board/${boardId}`);

  if (!res.ok) {
    throw new Error('No se pudo cargar el tablero de la base de datos');
  }

  return res.json() as Promise<BoardData>;
}
