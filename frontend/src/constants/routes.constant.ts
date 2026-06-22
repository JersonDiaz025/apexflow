export type RouteString = `/${string}`;

// Base API Prefix para el backend
const AUTH_API_PREFIX = '/auth';
const KANBAN_API_PREFIX = '/kanban';

/**
 * 1. RUTAS DEL FRONTEND (Next.js App Router)
 * Estas son las url que el usuario ve en el navegador y las que usa el Middleware.
 */
export const ROUTES = {
    LOGIN: '/login' as RouteString,
    REGISTER: '/register' as RouteString,
    LOGOUT: '/logout' as RouteString,
    // Rutas Protegidas (Dashboard)
    BOARDS: '/boards' as RouteString,
    BOARD_DETAIL: (id: string): RouteString => `/board/${id}`, // El Kanban interno
    PROFILE: '/profile' as RouteString,
    CONFIG: '/config',
} as const;

/**
 * 2. ENDPOINTS DEL BACKEND (NestJS API)
 * Estas son las url exactas a las que Axios les hace peticiones HTTP.
 */
export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: `${AUTH_API_PREFIX}/login`,
        REGISTER: `${AUTH_API_PREFIX}/register`,
        PROFILE: `user/profile`,
    },
    KANBAN: {
        GET_BOARDS: `${KANBAN_API_PREFIX}/boards`,
        BOARD_BY_ID: (id: string) => `${KANBAN_API_PREFIX}/board/${id}`,
        CREATE_BOARD: `${KANBAN_API_PREFIX}/board`,
        CREATE_COLUMN: `${KANBAN_API_PREFIX}/column`,
        CREATE_TASK: `${KANBAN_API_PREFIX}/task`,
    },
} as const;

/**
 * 3. SEGURIDAD (Configuración para el Middleware)
 */
export const PUBLIC_ROUTES = [ROUTES.LOGIN, ROUTES.REGISTER] as const;

// Bloqueamos explícitamente '/boards' y cualquier subruta de '/board' (como /board/123)
export const PROTECTED_PREFIXES = ['/boards', '/board'] as const;
