export interface MoveTaskPayload {
  boardId: string;
  taskId: string;
  fromColumnId: string;
  toColumnId: string;
  newOrder: number;
  taskTitle: string;
  toColumnTitle: string;
}

export interface TaskMovedEmitPayload {
  taskId: string;
  fromColumnId: string;
  toColumnId: string;
  newOrder: number;
}

export interface ActivityLogEmitPayload {
  message: string;
  createdAt: Date;
}

export interface TaskMovementResult {
  updatedTask: {
    id: string;
    title: string;
    description: string | null;
    order: number;
    columnId: string;
  };
  log: {
    id: string;
    message: string;
    createdAt: Date;
    boardId: string;
  };
}
