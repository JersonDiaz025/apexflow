'use server';

import { FormState } from '@/types/form.types';
import { RegisterDto } from '@/types/auth.types';
import { handleActionError } from '@/utils/error-handler';
import { authService } from '@/features/auth/services/auth.service';
import { INITIAL_FORM_STATE, authSchema } from '@/schemas/auth.schema';

export async function registerAction(prevState: FormState, formData: FormData): Promise<FormState> {
    const data = Object.fromEntries(formData);
    const result = authSchema.safeParse(data);
    const currentFields = data as Record<string, string>;

    if (!result.success) {
        return {
            ...INITIAL_FORM_STATE,
            data: currentFields,
            errors: result?.error.flatten().fieldErrors,
        };
    }

    try {
        const res = await authService.register(result.data as RegisterDto);
        return {
            ...INITIAL_FORM_STATE,
            success: res.success,
            message: res.message,
        };
    } catch (error) {
        return handleActionError(error, currentFields);
    }
}
