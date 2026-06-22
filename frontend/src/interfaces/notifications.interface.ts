export type ToastPosition =
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';

export interface NotificationOptions {
    description?: string;
    duration?: number;
    position?: ToastPosition;
}
