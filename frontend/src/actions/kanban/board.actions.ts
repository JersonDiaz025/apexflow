'use server';

import { revalidatePath } from 'next/cache';
import { BoardFormState } from '@/types/board.types';
import { ROUTES } from '@/constants/routes.constant';
import { handleActionError } from '@/utils/error-handler';
import { boardService } from '@/services/board/board.service';
import { CreateColumnDto, CreateTaskDto } from '@/interfaces/kanban.interface';
import {
    CreateBoardInput,
    createBoardSchema,
    INITIAL_BOARD_FORM_STATE,
} from '@/schemas/board.schema';
import { createColumnSchema } from '@/schemas/column.schema';
import {
    ColumnFormState,
    CreateColumnInput,
} from '@/features/kanban/interfaces/column-state.interface';
import { FORM_TYPES } from '@/constants/form-types.constants';
import { GenericFormState } from '@/types/form.types';

export async function getBoardsAction() {
    return await boardService.getBoards();
}

export async function createBoardAction(
    prevState: BoardFormState,
    formData: FormData
): Promise<BoardFormState> {
    const data = Object.fromEntries(formData);
    const currentFields = data as Record<string, string>;
    const validatedFields = createBoardSchema.safeParse(data);

    if (!validatedFields.success) {
        return {
            ...INITIAL_BOARD_FORM_STATE,
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            data: currentFields,
        };
    }

    try {
        const dto = validatedFields.data;
        await boardService.createBoard(dto);
        revalidatePath(ROUTES.BOARDS);
        return {
            ...INITIAL_BOARD_FORM_STATE,
            success: true,
            message: '¡Tablero creado con éxito! ',
        };
    } catch (error) {
        return handleActionError<CreateBoardInput>(error, currentFields);
    }
}

// export async function createTaskAction(dto: CreateTaskDto) {
//     return boardService.createTask(dto);
// }

// export async function createColumnAction(dto: CreateColumnDto, boardId: string) {
//     try {
//         const response = await boardService.createColumn(dto);
//         revalidatePath(`${ROUTES.BOARDS}/${boardId}`);
//         return { success: true, data: response };
//     } catch {
//         return { success: false, error: 'Error al crear la columna' };
//     }
// }
export async function createColumnAction(
    boardId: string | undefined,
    prevState: GenericFormState<CreateColumnInput>,
    formData: FormData
): Promise<GenericFormState<CreateColumnInput>> {
    if (!boardId) {
        return { success: false, message: 'El ID del tablero es requerido.' };
    }
    const titleValue = formData.get(FORM_TYPES.TITLE) as string;
    const currentFields: CreateColumnInput = { title: titleValue };
    const validatedFields = createColumnSchema.safeParse(currentFields);

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            data: currentFields,
            message: 'Por favor, corrige los errores del formulario.',
        };
    }
    try {
        const createColumnDto = {
            title: validatedFields.data.title,
            boardId: boardId,
            order: 0, // Inicia en 0 por ser el estado vacío
        };

        await boardService.createColumn(createColumnDto);
        revalidatePath(`${ROUTES.BOARDS}/${boardId}`);
        return {
            success: true,
            message: '¡Columna creada con éxito!',
            data: { title: '' },
        };
    } catch (error) {
        return handleActionError<CreateColumnInput>(error, currentFields);
    }
}

export async function createTaskAction(dto: CreateTaskDto, boardId: string) {
    try {
        const response = await boardService.createTask(dto);
        revalidatePath(`${ROUTES.BOARDS}/${boardId}`);
        return { success: true, data: response };
    } catch {
        return { success: false, error: 'Error al crear la tarea' };
    }
}
