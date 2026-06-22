import { sileo } from 'sileo';
import { ToastPosition, NotificationOptions } from '@/interfaces/notifications.interface';

export const toast = {
    defaults: {
        position: 'top-center' as ToastPosition,
        duration: 4000,
    },

    success: (title: string, options?: NotificationOptions) => {
        sileo.success({
            title,
            description: options?.description,
            position: options?.position || toast.defaults.position,
            duration: options?.duration || toast.defaults.duration,
        });
    },

    error: (title: string, options?: NotificationOptions) => {
        sileo.error({
            title: title || 'Error inesperado',
            description: options?.description || 'Por favor, inténtalo de nuevo.',
            position: options?.position || toast.defaults.position,
            duration: options?.duration || 5000,
        });
    },

    warning: (title: string, options?: NotificationOptions) => {
        sileo.warning({
            title,
            description: options?.description,
            position: options?.position || toast.defaults.position,
            duration: options?.duration || toast.defaults.duration,
        });
    },

    info: (title: string, options?: NotificationOptions) => {
        sileo.info({
            title,
            description: options?.description,
            position: options?.position || toast.defaults.position,
            duration: options?.duration || toast.defaults.duration,
        });
    },

    promise: <T>(
        promise: Promise<T>,
        messages: { loading: string; success: string; error: string },
        options?: Omit<NotificationOptions, 'duration'>
    ): Promise<T> => {
        const targetPosition = options?.position || toast.defaults.position;

        return sileo.promise(promise, {
            loading: {
                title: messages.loading,
                position: targetPosition,
            },
            success: {
                title: messages.success,
                position: targetPosition,
            },
            error: {
                title: messages.error,
                position: targetPosition,
            },
        });
    },
};
