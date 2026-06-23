'use server';

import { revalidatePath } from 'next/cache';
import { ROUTES } from '@/constants/routes.constant';
import { handleActionError } from '@/utils/error-handler';
import { teamService } from '@/services/team/team.service';
import {
    inviteUserSchema,
    InviteUserInput,
    INITIAL_INVITE_FORM_STATE,
} from '@/schemas/team.schema';
import { TeamFormState } from '@/types/team.types';

export async function inviteUserAction(
    boardId: string | undefined,
    prevState: TeamFormState,
    formData: FormData
): Promise<TeamFormState> {
    const data = Object.fromEntries(formData);
    const currentFields = data as Record<string, string>;

    const validatedFields = inviteUserSchema.safeParse(data);

    if (!validatedFields.success) {
        return {
            ...INITIAL_INVITE_FORM_STATE,
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            data: currentFields,
        };
    }

    try {
        const { email } = validatedFields.data;
        await teamService.inviteUserByEmail(boardId, email);
        if (boardId) {
            revalidatePath(`${ROUTES.BOARDS}/${boardId}`);
        } else {
            revalidatePath(ROUTES.TEAM);
        }

        return {
            ...INITIAL_INVITE_FORM_STATE,
            success: true,
            message: '¡Invitación enviada con éxito!',
        };
    } catch (error) {
        return handleActionError<InviteUserInput>(error, currentFields);
    }
}
