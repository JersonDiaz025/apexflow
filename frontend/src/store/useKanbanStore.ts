import { create } from 'zustand';
import {
    ActivityLog,
    Board,
    KanbanState,
    MoveTaskPayload,
    TaskMovedServerPayload,
} from '@/interfaces/kanban.interface';
import { createBoardSocket } from '@/services/socket.service';
import { applyTaskMovement } from '@/utils/board-updater';

export const useKanbanStore = create<KanbanState>((set, get) => ({
    socket: null,
    board: null,
    activities: [],

    initSocket: (boardId: string) => {
        if (get().socket) return;

        const socket = createBoardSocket();

        socket.on('connect', () => {
            socket.emit('joinBoard', boardId);
        });

        socket.on('taskMoved', (payload: TaskMovedServerPayload) => {
            const currentBoard = get().board;

            if (!currentBoard) return;

            const updatedBoard = applyTaskMovement(currentBoard, payload);

            set({
                board: updatedBoard,
            });
        });

        socket.on('newActivity', (activity: ActivityLog) => {
            set((state) => ({
                activities: [activity, ...state.activities],
            }));
        });

        set({
            socket,
        });
    },

    disconnectSocket: () => {
        const socket = get().socket;

        if (!socket) return;

        socket.disconnect();

        set({
            socket: null,
            board: null,
            activities: [],
        });
    },

    emitMoveTask: (payload: Omit<MoveTaskPayload, 'boardId'>) => {
        const { socket, board } = get();

        if (!socket || !board) return;

        socket.emit('moveTask', {
            boardId: board.id,
            ...payload,
        });
    },

    setBoard: (board: Board) => {
        set({ board });
    },

    addActivity: (activity: ActivityLog) => {
        set((state) => ({
            activities: [activity, ...state.activities],
        }));
    },
}));
