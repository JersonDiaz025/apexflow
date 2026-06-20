'use server';

import { boardService } from '@/services/kanban/kanban.service';
import { CreateTaskDto, CreateBoardDto } from '@/interfaces/kanban.interface';

export async function getBoardsAction() {
    return await boardService.getBoards();
}

export async function createBoardAction(dto: CreateBoardDto) {
    return boardService.createBoard(dto);
}

export async function createTaskAction(dto: CreateTaskDto) {
    return boardService.createTask(dto);
}
