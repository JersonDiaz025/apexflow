'use server';

import { redirect } from 'next/navigation';
import { FormState } from '@/types/form.types';
import { ROUTES } from '@/constants/routes.constant';
import { ApiError, RegisterDto } from '@/types/auth.types';
import { authService } from '@/services/auth/auth.service';
import { INITIAL_FORM_STATE, authSchema } from '@/schemas/auth.schema';

export async function registerAction(prevState: FormState, formData: FormData): Promise<FormState> {
    let isSuccessful = false;
    const data = Object.fromEntries(formData);
    const result = authSchema.safeParse(data);

    if (!result.success) {
        return {
            ...INITIAL_FORM_STATE,
            data: data as Record<string, string>,
            errors: result?.error.flatten().fieldErrors,
        };
    }

    try {
        const res = await authService.register(result.data as RegisterDto);
        isSuccessful = true;
        console.log('Registro', res);
    } catch (error) {
        const apiError = error as ApiError;
        return {
            ...INITIAL_FORM_STATE,
            data: data as Record<string, string>,
            message: apiError.message as string,
        };
    }

    if (isSuccessful) {
        redirect(ROUTES.LOGIN);
    }

    return INITIAL_FORM_STATE;
}
