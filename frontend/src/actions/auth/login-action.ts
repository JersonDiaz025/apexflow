'use server';

import { FormState } from '@/types/form.types';
import { createSession } from '@/utils/session.lib';
import { handleActionError } from '@/utils/error-handler';
import { authService } from '@/features/auth/services/auth.service';
import { authSchema, INITIAL_FORM_STATE } from '@/schemas/auth.schema';

export async function loginAction(prevState: FormState, formData: FormData): Promise<FormState> {
    const data = Object.fromEntries(formData);
    const currentFields = data as Record<string, string>;
    const result = authSchema.safeParse(data);

    if (!result.success) {
        return {
            ...INITIAL_FORM_STATE,
            data: currentFields,
            errors: result.error.flatten().fieldErrors,
        };
    }

    try {
        const res = await authService.login(result.data);
        await createSession(res.token);
        return {
            ...INITIAL_FORM_STATE,
            success: true,
            message: res.message,
        };
    } catch (error) {
        return handleActionError(error, currentFields);
    }
}
