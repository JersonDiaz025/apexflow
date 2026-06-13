import { io, Socket } from 'socket.io-client';
import { ActivityLog, TaskMovedServerPayload } from '@/interfaces/kanban.interface';
import { applyTaskMovement } from '@/utils/board-updater';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

export function createKanbanSocket(boardId: string): Socket {
  const socket = io(BACKEND_URL, { withCredentials: true });

  socket.on('connect', () => {
    socket.emit('joinBoard', boardId);
  });

  return socket;
}

/**
 * Suscribe el socket a los eventos del servidor y despacha las acciones al store.
 */
export function registerSocketEvents(
  socket: Socket,
  set: (state: any) => void,
  get: () => any
) {
  // Escuchar movimientos de otros usuarios
  socket.on('taskMoved', (data: TaskMovedServerPayload) => {
    const currentBoard = get().board;
    if (!currentBoard) return;

    // Usamos el utilitario limpio fuera del store
    const updatedBoard = applyTaskMovement(currentBoard, data);
    set({ board: updatedBoard });
  });

  // Escuchar logs de auditoría en vivo
  socket.on('newActivity', (activity: ActivityLog) => {
    set((state: any) => ({ activities: [activity, ...state.activities] }));
  });
}
