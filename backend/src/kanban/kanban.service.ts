import { Prisma } from '../../generated/prisma/client';
import { PrismaService } from '@/prisma/prisma.service';
import { MoveTaskDto } from '@/kanban/dtos/move-task.dto';
import { CreateTaskDto } from '@/kanban/dtos/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from '@/kanban/dtos/create-board.dto';
import { CreateColumnDto } from '@/kanban/dtos/create-column.dto';
import { TaskMovementResult } from '@/kanban/interfaces/kanban-events.interface';

@Injectable()
export class KanbanService {
  constructor(private readonly prisma: PrismaService) {}

  async getBoards() {
    return this.prisma.board.findMany({
      select: {
        id: true,
        title: true,
      },
      orderBy: {
        title: 'asc',
      },
    });
  }

  /**
   * Crea un tablero (Board) en la base de datos.
   */
  async createBoard(dto: CreateBoardDto) {
    return this.prisma.board.create({
      data: {
        title: dto.title,
      },
    });
  }

  /**
   * Obtiene un tablero completo con sus columnas y tareas ordenadas ascendentemente.
   */
  async getBoardById(boardId: string) {
    const board = await this.prisma.board.findUnique({
      where: { id: boardId },
      include: {
        columns: {
          orderBy: { order: 'asc' },
          include: {
            tasks: {
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });

    if (!board) {
      throw new NotFoundException(`El tablero con ID "${boardId}" no existe.`);
    }

    return board;
  }

  /**
   * Crea una columna atada a un tablero específico.
   */
  async createColumn(dto: CreateColumnDto) {
    const boardExists = await this.prisma.board.findUnique({
      where: { id: dto.boardId },
    });

    if (!boardExists) {
      throw new NotFoundException(`El tablero con ID "${dto.boardId}" no existe.`);
    }

    return this.prisma.column.create({
      data: {
        title: dto.title,
        order: dto.order,
        boardId: dto.boardId,
      },
    });
  }

  /**
   * Crea una tarea dentro de una columna específica.
   */
  async createTask(dto: CreateTaskDto) {
    const columnExists = await this.prisma.column.findUnique({
      where: { id: dto.columnId },
    });

    if (!columnExists) {
      throw new NotFoundException(`La columna con ID "${dto.columnId}" no existe.`);
    }

    return this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description ?? null,
        order: dto.order,
        columnId: dto.columnId,
      },
    });
  }

  // ==========================================
  //         MÉTODOS WEBSOCKET (REAL-TIME)
  // ==========================================

  /**
   * Maneja el movimiento de tareas de forma transaccional y registra el historial.
   */
  async handleTaskMovement(data: MoveTaskDto): Promise<TaskMovementResult> {
    const activityMessage = `Tarea "${data.taskTitle}" movida a "${data.toColumnTitle}"`;

    return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // 1. Mover la tarea a la columna y posición correspondiente
      const updatedTask = await tx.task.update({
        where: { id: data.taskId },
        data: {
          columnId: data.toColumnId,
          order: data.newOrder,
        },
      });

      // 2. Crear el log de actividad histórico atado al tablero
      const log = await tx.activityLog.create({
        data: {
          boardId: data.boardId,
          message: activityMessage,
        },
      });

      return { updatedTask, log };
    });
  }
}
