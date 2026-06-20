import { KanbanService } from '@/kanban/kanban.service';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { KANBAN } from '@/constants/kanban.routes.constants';
import { CreateTaskDto } from '@/kanban/dtos/create-task.dto';
import { CreateBoardDto } from '@/kanban/dtos/create-board.dto';
import { CreateColumnDto } from '@/kanban/dtos/create-column.dto';
import { AuthenticatedRequest } from '@/kanban/interfaces/auth.interface';
import { Body, Controller, Get, Param, Post, UseGuards, Req } from '@nestjs/common';

@Controller(KANBAN.BASE)
export class KanbanController {
  constructor(private readonly kanbanService: KanbanService) {}

  @UseGuards(JwtAuthGuard)
  @Post(KANBAN.BOARD)
  // 2. Cambiamos 'Request' por nuestra nueva interfaz 'AuthenticatedRequest'
  createBoard(@Body() dto: CreateBoardDto, @Req() req: AuthenticatedRequest) {
    // ¡Ahora TypeScript sabe exactamente qué es req.user y autocompleta el userId!
    const userId = req.user.userId;
    return this.kanbanService.createBoard(dto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(KANBAN.BOARDS)
  getBoards(@Req() req: AuthenticatedRequest) {
    const userId = req.user.userId;
    return this.kanbanService.getBoards(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(KANBAN.BOARD_ID)
  getBoard(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    const userId = req.user.userId;
    return this.kanbanService.getBoardById(id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(KANBAN.COLUMN)
  createColumn(@Body() dto: CreateColumnDto, @Req() req: AuthenticatedRequest) {
    const userId = req.user.userId;
    return this.kanbanService.createColumn(dto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(KANBAN.TASK)
  createTask(@Body() dto: CreateTaskDto, @Req() req: AuthenticatedRequest) {
    const userId = req.user.userId;
    return this.kanbanService.createTask(dto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(KANBAN.INVITE)
  inviteUser(
    @Param('id') boardId: string,
    @Body('email') email: string,
    @Req() req: AuthenticatedRequest
  ) {
    const ownerId = req.user.userId;
    return this.kanbanService.inviteUserByEmail(boardId, email, ownerId);
  }
}
