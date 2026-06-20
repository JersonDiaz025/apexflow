import {
    Board,
    Column,
    Task,
    CreateBoardDto,
    CreateColumnDto,
    CreateTaskDto,
    IBoardService,
} from '@/interfaces/kanban.interface';
import { apiServer } from '@/axios/api-server';
import { KANBAN_ROUTES } from '@/constants/routes.constant';

export const boardService: IBoardService = {
    getBoards(): Promise<Board[]> {
        return apiServer.get(KANBAN_ROUTES.BOARDS);
    },

    getBoard(boardId: string): Promise<Board> {
        return apiServer.get(KANBAN_ROUTES.BOARD(boardId));
    },

    createBoard(dto: CreateBoardDto): Promise<Board> {
        return apiServer.post(KANBAN_ROUTES.CREATE_BOARD, {
            dto,
        });
    },

    createColumn(dto: CreateColumnDto): Promise<Column> {
        return apiServer.post(KANBAN_ROUTES.CREATE_COLUMN, dto);
    },

    createTask(dto: CreateTaskDto): Promise<Task> {
        return apiServer.post(KANBAN_ROUTES.CREATE_TASK, dto);
    },
};
