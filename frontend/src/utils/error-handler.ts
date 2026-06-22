import { AxiosError } from 'axios';
import { GenericFormState } from '@/types/form.types';
import { NestErrorResponse } from '@/types/api.types';

export function handleActionError<T>(
    error: unknown,
    currentData?: Partial<T>
): GenericFormState<T> {
    const formError: GenericFormState<T> = {
        success: false,
        message: 'Ocurrió un error inesperado. Inténtalo de nuevo.',
        errors: {},
        data: currentData || ({} as Partial<T>),
    };

    if (error instanceof AxiosError) {
        const apiData = error.response?.data as NestErrorResponse | undefined;

        if (apiData) {
            if (typeof apiData.message === 'string') {
                formError.message = apiData.message;
            } else if (Array.isArray(apiData.message)) {
                formError.message = apiData.message[0] || 'Error de validación en el servidor';
            }

            if (apiData.errors) {
                formError.errors = apiData.errors;
            }
        }
    } else if (error instanceof Error) {
        formError.message = error.message;
    }

    return formError;
}
