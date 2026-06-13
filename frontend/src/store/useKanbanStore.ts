import { create } from 'zustand';
import { fetchBoardData } from '@/services/kanban-api';
import { KanbanState } from '@/interfaces/kanban.interface';
import { createKanbanSocket, registerSocketEvents } from '@/services/kanban-socket';

export const useKanbanStore = create<KanbanState>((set, get) => ({
  socket: null,
  board: null,
  activities: [],
  isLoading: false,

  fetchBoard: async (boardId) => {
    set({ isLoading: true });
    try {
      const board = await fetchBoardData(boardId);
      set({ board });
    } catch (error) {
      console.error('Error en el store cargando el tablero:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  initSocket: (boardId) => {
    if (get().socket) return;

    const socket = createKanbanSocket(boardId);

    // Vinculamos los listeners inyectando las mutaciones de Zustand
    registerSocketEvents(socket, set, get);

    set({ socket });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null, board: null, activities: [] });
    }
  },

  emitMoveTask: (payload) => {
    const { socket, board } = get();
    if (socket && board) {
      socket.emit('moveTask', { boardId: board.id, ...payload });
    }
  },
}));
