import { AxiosError } from 'axios';
import { FormState } from '@/types/form.types';
import { NestErrorResponse } from '@/types/api.types';
import { INITIAL_FORM_STATE } from '@/schemas/auth.schema';

export function handleActionError(error: unknown, currentData?: Record<string, string>): FormState {
    const formError: FormState = {
        ...INITIAL_FORM_STATE,
        data: currentData || {},
        success: false,
        message: 'Ocurrió un error inesperado. Inténtalo de nuevo.',
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
