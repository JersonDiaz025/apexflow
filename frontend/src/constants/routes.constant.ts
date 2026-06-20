type RouteString = `/${string}` | string;
// type RouteParams = string | number;

//Auth routes
export const AUTH = '/auth';
export const PROTECTED_PREFIXES = ['/board', '/kanban'];

export const KANBAN_ROUTES = {
    BOARD_APP: '/board',
    BOARDS: '/kanban/boards',
    BOARD_DETAIL: (boardId: string) => `/board/${boardId}` as RouteString,
    BOARD: (boardId: string) => `/kanban/board/${boardId}`,
    CREATE_BOARD: '/kanban/board',
    CREATE_COLUMN: '/kanban/column',
    CREATE_TASK: '/kanban/task',
} as const;

export const ROUTES = {
    LOGIN: '/login' as RouteString,
    LOGOUT: '/logout' as RouteString,
    REGISTER: '/register' as RouteString,

    PROFILE: {
        ROOT: '/profile',
        ME: `${AUTH}/me`,
    },
} as const;

export const PUBLIC_ROUTES = [ROUTES.LOGIN, ROUTES.REGISTER];
// Full routes fron request servers services
export const FULL_REGISTER = `${AUTH}${ROUTES.REGISTER}`;
export const FULL_LOGIN = `${AUTH}${ROUTES.LOGIN}`;
