import { z } from 'zod';
import { TeamFormState } from '@/types/team.types';

export const inviteUserSchema = z.object({
    email: z
        .string()
        .min(1, 'El correo electrónico es obligatorio')
        .email('Por favor, ingresa un formato de correo válido'),
});

export type InviteUserInput = z.infer<typeof inviteUserSchema>;

export const INITIAL_INVITE_FORM_STATE: TeamFormState = {
    success: false,
    errors: {},
    message: '',
    data: { email: '' },
};
