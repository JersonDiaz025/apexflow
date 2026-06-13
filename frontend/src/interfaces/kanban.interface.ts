import {  Socket } from 'socket.io-client';

export interface Task {
  id: string;
  title: string;
  description: string | null;
  order: number;
  columnId: string;
}

export interface Column {
  id: string;
  title: string;
  order: number;
  tasks: Task[];
}

export interface BoardData {
  id: string;
  title: string;
  columns: Column[];
}

export interface ActivityLog {
  message: string;
  createdAt: string;
}

// Payloads para comunicación con el backend (Socket.io)
export interface MoveTaskPayload {
  boardId: string;
  taskId: string;
  fromColumnId: string;
  toColumnId: string;
  newOrder: number;
  taskTitle: string;
  toColumnTitle: string;
}

export interface TaskMovedServerPayload {
  taskId: string;
  fromColumnId: string;
  toColumnId: string;
  newOrder: number;
}

export interface KanbanState {
  socket: Socket | null;
  board: BoardData | null;
  activities: ActivityLog[];
  isLoading: boolean;
  fetchBoard: (boardId: string) => Promise<void>;
  initSocket: (boardId: string) => void;
  disconnectSocket: () => void;
  emitMoveTask: (payload: Omit<MoveTaskPayload, 'boardId'>) => void;
}
