import { z } from 'zod';
import { FormState } from '@/types/form.types';

export const INITIAL_FORM_STATE: FormState = {
    errors: {},
    message: '',
    success: false,
};

export const authSchema = z.object({
    email: z
        .string()
        .min(1, 'El correo electrónico es requerido')
        .email('El correo electrónico no es válido'),

    password: z
        .string()
        .min(2, 'La contraseña es requerida')
        .max(20, 'La contraseña es demasiado larga'),

    name: z
        .string()
        .trim()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(20, 'El nombre no puede superar los 20 caracteres')
        .optional(),
});

export type CreateAuthInput = z.infer<typeof authSchema>;

