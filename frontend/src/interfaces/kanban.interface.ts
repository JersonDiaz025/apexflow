import { Socket } from 'socket.io-client';

/* =========================
 * DOMAIN
 * ========================= */

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

export interface Board {
    id: string;
    title: string;
    columns: Column[];
}

export interface ActivityLog {
    message: string;
    createdAt: string;
}

/* =========================
 * SOCKET EVENTS
 * ========================= */

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

/* =========================
 * BOARD SERVICE
 * ========================= */

export interface CreateBoardDto {
    title: string;
}

export interface CreateColumnDto {
    boardId: string;
    title: string;
    order: number;
}

export interface CreateTaskDto {
    columnId: string;
    title: string;
    description?: string;
    order: number;
}

export interface IBoardService {
    getBoards(): Promise<Board[]>;
    getBoard(boardId: string): Promise<Board>;
    createBoard(dto: CreateBoardDto): Promise<Board>;
    createColumn(dto: CreateColumnDto): Promise<Column>;
    createTask(dto: CreateTaskDto): Promise<Task>;
}

/* =========================
 * ZUSTAND STORE
 * ========================= */

// export interface KanbanState {
//     socket: Socket | null;
//     board: Board | null;
//     activities: ActivityLog[];
//     isLoading: boolean;
//     fetchBoard: (boardId: string) => Promise<void>;
//     initSocket: (boardId: string) => void;
//     disconnectSocket: () => void;
//     emitMoveTask: (payload: Omit<MoveTaskPayload, 'boardId'>) => void;
//     setBoard: (board: Board) => void;

//     addActivity: (activity: ActivityLog) => void;
// }

export interface KanbanState {
    socket: Socket | null;
    board: Board | null;
    activities: ActivityLog[];

    setBoard: (board: Board) => void;

    initSocket: (boardId: string) => void;

    disconnectSocket: () => void;

    emitMoveTask: (payload: Omit<MoveTaskPayload, 'boardId'>) => void;
}
