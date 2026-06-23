import { z } from 'zod';
import { BoardFormState } from '@/types/board.types';

export const createBoardSchema = z.object({
    title: z
        .string()
        .min(1, 'El título es requerido.')
        .min(3, 'El título debe tener al menos 3 caracteres.')
        .max(60, 'El título no puede exceder los 50 caracteres.')
        .transform((val) => val.trim()),
    description: z
        .string()
        .min(1, 'La descripción es requerida.')
        .min(3, 'La descripción debe tener al menos 3 caracteres.')
        .max(300, 'La descripción no puede exceder los 300 caracteres.')
        .transform((val) => val.trim()),
});

export type CreateBoardInput = z.infer<typeof createBoardSchema>;

export const INITIAL_BOARD_FORM_STATE: BoardFormState = {
    success: false,
    message: '',
    errors: {},
    data: {
        title: '',
        description: '',
    },
};
