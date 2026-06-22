'use server';

import { revalidatePath } from 'next/cache';
import { BoardFormState } from '@/types/board.types';
import { ROUTES } from '@/constants/routes.constant';
import { handleActionError } from '@/utils/error-handler';
import { boardService } from '@/services/board/board.service';
import { CreateTaskDto } from '@/interfaces/kanban.interface';
import {
    CreateBoardInput,
    createBoardSchema,
    INITIAL_BOARD_FORM_STATE,
} from '@/schemas/board.schema';

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

export async function createTaskAction(dto: CreateTaskDto) {
    return boardService.createTask(dto);
}
