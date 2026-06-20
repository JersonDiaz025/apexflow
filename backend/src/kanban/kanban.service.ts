import { Prisma } from '../../generated/prisma/client';
import { PrismaService } from '@/prisma/prisma.service';
import { MoveTaskDto } from '@/kanban/dtos/move-task.dto';
import { CreateTaskDto } from '@/kanban/dtos/create-task.dto';
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateBoardDto } from '@/kanban/dtos/create-board.dto';
import { CreateColumnDto } from '@/kanban/dtos/create-column.dto';
import { TaskMovementResult } from '@/kanban/interfaces/kanban-events.interface';

@Injectable()
export class KanbanService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Obtiene todos los tableros donde el usuario es dueño O es miembro colaborador.
   */
  async getBoards(userId: string) {
    return this.prisma.board.findMany({
      where: {
        OR: [{ ownerId: userId }, { members: { some: { id: userId } } }],
      },
      select: {
        id: true,
        title: true,
        ownerId: true,
        owner: {
          select: { name: true, email: true },
        },
      },
      orderBy: {
        title: 'asc',
      },
    });
  }

  /**
   * Crea un tablero asignando el owner de manera mandatoria.
   */
  async createBoard(dto: CreateBoardDto, ownerId: string) {
    return this.prisma.board.create({
      data: {
        title: dto.title,
        ownerId: ownerId, // Enlazado al creador
      },
    });
  }

  /**
   * Obtiene un tablero completo con sus columnas, tareas y sus miembros actuales.
   * Valida rigurosamente la seguridad (sólo participantes autorizados).
   */
  async getBoardById(boardId: string, userId: string) {
    const board = await this.prisma.board.findUnique({
      where: { id: boardId },
      include: {
        owner: {
          select: { id: true, name: true, email: true },
        },
        members: {
          select: { id: true, name: true, email: true },
        },
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

    // CLÁUSULA DE SEGURIDAD: Evita que usuarios ajenos espíen tableros con el link directo
    const isOwner = board.ownerId === userId;
    const isMember = board.members.some((m) => m.id === userId);

    if (!isOwner && !isMember) {
      throw new ForbiddenException('No tienes permisos para acceder a este tablero.');
    }

    return board;
  }

  /**
   * Crea una columna validando los accesos del usuario al tablero.
   */
  async createColumn(dto: CreateColumnDto, userId: string) {
    // Reutilizamos la lógica de control de acceso
    await this.getBoardById(dto.boardId, userId);

    return this.prisma.column.create({
      data: {
        title: dto.title,
        order: dto.order,
        boardId: dto.boardId,
      },
    });
  }

  /**
   * Crea una tarea dentro de una columna.
   */
  async createTask(dto: CreateTaskDto, userId: string) {
    const column = await this.prisma.column.findUnique({
      where: { id: dto.columnId },
    });

    if (!column) {
      throw new NotFoundException(`La columna con ID "${dto.columnId}" no existe.`);
    }

    // Validamos accesos al tablero de esa columna
    await this.getBoardById(column.boardId, userId);

    return this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description ?? null,
        order: dto.order,
        columnId: dto.columnId,
      },
    });
  }

  /**
   * Invita a un usuario externo al tablero mediante su correo electrónico.
   */
  async inviteUserByEmail(boardId: string, email: string, ownerId: string) {
    const board = await this.prisma.board.findUnique({
      where: { id: boardId },
    });

    if (!board) throw new NotFoundException('Tablero no encontrado');
    if (board.ownerId !== ownerId) {
      throw new ForbiddenException('Solo el dueño del tablero puede invitar colaboradores.');
    }

    // Buscamos si el usuario existe en el sistema
    const userToInvite = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!userToInvite) {
      throw new NotFoundException(
        `El usuario con el correo "${email}" no está registrado en la plataforma.`
      );
    }

    if (board.ownerId === userToInvite.id) {
      throw new ForbiddenException('No puedes invitarte a ti mismo si ya eres el dueño.');
    }

    // Conectamos de forma limpia usando la tabla implícita Many-to-Many de Prisma
    return this.prisma.board.update({
      where: { id: boardId },
      data: {
        members: {
          connect: { id: userToInvite.id },
        },
      },
      select: {
        id: true,
        title: true,
        members: { select: { id: true, name: true, email: true } },
      },
    });
  }

  // ==========================================
  //         MÉTODOS WEBSOCKET (REAL-TIME)
  // ==========================================

  /**
   * Transacciona el movimiento de tareas asociando obligatoriamente el usuario emisor.
   */
  async handleTaskMovement(
    data: MoveTaskDto,
    userId: string,
    userName: string
  ): Promise<TaskMovementResult> {
    // Mensaje enriquecido con lenguaje natural
    const activityMessage = `${userName} movió la tarea "${data.taskTitle}" a "${data.toColumnTitle}"`;

    return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // 1. Mover la tarea
      const updatedTask = await tx.task.update({
        where: { id: data.taskId },
        data: {
          columnId: data.toColumnId,
          order: data.newOrder,
        },
      });

      // 2. Crear la auditoría enlazada al tablero y al usuario responsable
      const log = await tx.activityLog.create({
        data: {
          boardId: data.boardId,
          userId: userId, // ID de quien movió la tarjeta
          message: activityMessage,
        },
      });

      return { updatedTask, log };
    });
  }
}
