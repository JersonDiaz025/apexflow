import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { KanbanService } from '@/kanban/kanban.service';
import { MoveTaskDto } from '@/kanban/dtos/move-task.dto';

@WebSocketGateway({
  cors: {
    origin: (requestOrigin, callback) => {
      const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:3000';

      // Si no viene origen (ej. Postman/Herramientas de pruebas) o coincide con el permitido
      if (!requestOrigin || requestOrigin === allowedOrigin) {
        callback(null, true);
      } else {
        callback(new Error('No permitido por CORS dinámico de ApexFlow'));
      }
    },
    credentials: true,
  },
})
export class KanbanGateway {
  @WebSocketServer()
  server!: Server;

  constructor(private readonly kanbanService: KanbanService) {}

  @SubscribeMessage('joinBoard')
  handleJoinBoard(@ConnectedSocket() client: Socket, @MessageBody() boardId: string): void {
    client.join(boardId);
  }

  @SubscribeMessage('moveTask')
  async handleMoveTask(@MessageBody() data: MoveTaskDto): Promise<void> {
    const { log } = await this.kanbanService.handleTaskMovement(data);

    // 2. Notificar el movimiento a los demás usuarios en el tablero
    this.server.to(data.boardId).emit('taskMoved', {
      taskId: data.taskId,
      fromColumnId: data.fromColumnId,
      toColumnId: data.toColumnId,
      newOrder: data.newOrder,
    });

    // 3. Notificar la nueva actividad en tiempo real a todo el tablero
    this.server.to(data.boardId).emit('newActivity', {
      message: log.message,
      createdAt: log.createdAt,
    });
  }
}
