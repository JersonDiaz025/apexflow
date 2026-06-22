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
import { API_ENDPOINTS } from '@/constants/routes.constant';

export const boardService: IBoardService = {
    getBoards(): Promise<Board[]> {
        return apiServer.get(API_ENDPOINTS.KANBAN.GET_BOARDS);
    },

    getBoard(boardId: string): Promise<Board> {
        return apiServer.get(API_ENDPOINTS.KANBAN.BOARD_BY_ID(boardId));
    },

    createBoard(dto: CreateBoardDto): Promise<Board> {
        return apiServer.post(API_ENDPOINTS.KANBAN.CREATE_BOARD, dto);
    },

    createColumn(dto: CreateColumnDto): Promise<Column> {
        return apiServer.post(API_ENDPOINTS.KANBAN.CREATE_COLUMN, dto);
    },

    createTask(dto: CreateTaskDto): Promise<Task> {
        return apiServer.post(API_ENDPOINTS.KANBAN.CREATE_TASK, dto);
    },
};
