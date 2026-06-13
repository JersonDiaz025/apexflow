import { KanbanService } from '@/kanban/kanban.service';
import { CreateTaskDto } from '@/kanban/dtos/create-task.dto';
import { CreateBoardDto } from '@/kanban/dtos/create-board.dto';
import { CreateColumnDto } from '@/kanban/dtos/create-column.dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('kanban')
export class KanbanController {
  constructor(private readonly kanbanService: KanbanService) {}

  @Post('board')
  createBoard(@Body() dto: CreateBoardDto) {
    return this.kanbanService.createBoard(dto);
  }

  @Get('boards')
  getBoards() {
    return this.kanbanService.getBoards();
  }

  @Get('board/:id')
  getBoard(@Param('id') id: string) {
    return this.kanbanService.getBoardById(id);
  }

  @Post('column')
  createColumn(@Body() dto: CreateColumnDto) {
    return this.kanbanService.createColumn(dto);
  }

  @Post('task')
  createTask(@Body() dto: CreateTaskDto) {
    return this.kanbanService.createTask(dto);
  }
}
