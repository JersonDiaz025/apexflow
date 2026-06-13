export const KANBAN_ROUTES = {
  BOARDS: "/kanban/boards",
  BOARD: (boardId: string) => `/kanban/board/${boardId}`,
  CREATE_BOARD: "/kanban/board",
  CREATE_COLUMN: "/kanban/column",
  CREATE_TASK: "/kanban/task",
} as const;
