import { ColumnFormState } from '@/features/kanban/interfaces/column-state.interface';
import { z } from 'zod';

export const createColumnSchema = z.object({
    title: z
        .string()
        .min(1, { message: 'El título de la columna es obligatorio' })
        .max(50, { message: 'El título no puede exceder los 50 caracteres' })
        .trim(),
});

export const INITIAL_COLUMN_FORM_STATE: ColumnFormState = {
    success: false,
    message: '',
    data: {
        title: '',
    },
    errors: {},
};
