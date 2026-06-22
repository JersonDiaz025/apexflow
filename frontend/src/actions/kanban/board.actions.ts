'use server';

import { revalidatePath } from 'next/cache';
import { CreateBoardInput, createBoardSchema } from '@/schemas/board.schema';
import { handleActionError } from '@/utils/error-handler'; // Úsalo si ya formatea tu BoardFormState
import { boardService } from '@/services/board/board.service';
import { CreateTaskDto } from '@/interfaces/kanban.interface';
import { BoardFormState } from '@/types/board.types';
import { ROUTES } from '@/constants/routes.constant';
import { FORM_TYPES } from '@/constants/form-types.constants';

export async function getBoardsAction() {
    return await boardService.getBoards();
}

export async function createBoardAction(
    prevState: BoardFormState,
    formData: FormData
): Promise<BoardFormState> {
    const title = formData.get(FORM_TYPES.TITLE) as string;
    const description = formData.get(FORM_TYPES.DESCRIPTION) as string;
    const currentData = { title, description };
    const validatedFields = createBoardSchema.safeParse(currentData);

    if (!validatedFields.success) {
        return {
            success: false,
            message: 'Revisa los campos del formulario.',
            errors: validatedFields.error.flatten().fieldErrors,
            data: currentData,
        };
    }

    try {
        const dto = validatedFields.data;
        await boardService.createBoard(dto);
        revalidatePath(ROUTES.BOARDS);
        return {
            success: true,
            message: '¡Tablero creado con éxito! ',
            data: { title: '', description: '' },
        };
    } catch (error) {
        return handleActionError<CreateBoardInput>(error, currentData);
    }
}

export async function createTaskAction(dto: CreateTaskDto) {
    return boardService.createTask(dto);
}
