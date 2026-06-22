'use server';

import { revalidatePath } from 'next/cache';
import { createBoardSchema } from '@/schemas/board.schema';
import { handleActionError } from '@/utils/error-handler'; // Úsalo si ya formatea tu BoardFormState
import { boardService } from '@/services/board/board.service';
import { CreateTaskDto } from '@/interfaces/kanban.interface';
import { BoardFormState } from '@/types/board.types';
import { ROUTES } from '@/constants/routes.constant';

export async function getBoardsAction() {
    return await boardService.getBoards();
}

export async function createBoardAction(
    prevState: BoardFormState,
    formData: FormData
): Promise<BoardFormState> {
    // 1. Extraemos los campos crudos del formulario nativo de HTML
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    const currentData = { title, description };

    // 2. Construimos el DTO tipado y validamos con Zod
    const validatedFields = createBoardSchema.safeParse(currentData);

    // 3. Validaciones preventivas en el servidor antes de golpear NestJS
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
        console.log('Board dto listo para enviar:', dto);

        await boardService.createBoard(dto);

        // Descomenta esto para que refresque la UI automáticamente al crear
        revalidatePath(ROUTES.BOARDS);

        return {
            success: true,
            message: '¡Tablero creado con éxito! ',
            data: { title: '', description: '' }, // Limpiamos la data vieja al triunfar
        };
    } catch (error) {
        console.error('Error capturado en createBoardAction:', error);

        // 🚀 CORREGIDO: Retornamos un objeto de estado real con el mensaje de error de NestJS
        return {
            success: false,
            message:
                error?.response?.data?.message || error?.message || 'No se pudo crear el tablero.',
            data: currentData, // Mantenemos lo que el usuario escribió para que no se borre
        };
    }
}

export async function createTaskAction(dto: CreateTaskDto) {
    return boardService.createTask(dto);
}
