import z from 'zod';
import { createColumnSchema } from '@/schemas/column.schema';

export type CreateColumnInput = z.infer<typeof createColumnSchema>;

export interface ColumnFormState {
    success: boolean;
    message?: string;
    data?: Partial<CreateColumnInput>;
    errors?: {
        title?: string[];
    };
}
