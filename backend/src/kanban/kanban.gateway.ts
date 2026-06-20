import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { KanbanService } from '@/kanban/kanban.service';
import { MoveTaskDto } from '@/kanban/dtos/move-task.dto';
import { UnauthorizedException } from '@nestjs/common';
import { AuthenticatedSocket } from '@/kanban/interfaces/auth.interface';

@WebSocketGateway({
  cors: {
    origin: (requestOrigin, callback) => {
      const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:3000';
      if (!requestOrigin || requestOrigin === allowedOrigin) {
        callback(null, true);
      } else {
        callback(new Error('No permitido por CORS dinámico de ApexFlow'));
      }
    },
    credentials: true,
  },
})
export class KanbanGateway implements OnGatewayConnection {
  @WebSocketServer()
  server!: Server;

  // Inyectamos el JwtService para poder verificar los tokens en las conexiones en vivo
  constructor(
    private readonly kanbanService: KanbanService,
    private readonly jwtService: JwtService
  ) {}

  /**
   * Se ejecuta automáticamente cada vez que un cliente intenta abrir una conexión WebSocket.
   */
  async handleConnection(client: AuthenticatedSocket) {
    try {
      // 1. Extraemos el header de autorización
      const authHeader = client.handshake.headers.authorization;
      if (!authHeader) throw new UnauthorizedException('No token provided');

      // 2. Separamos el 'Bearer' del token real
      const token = authHeader.split(' ')[1];

      // CORRECCIÓN AQUÍ: Pasamos el 'token' como primer argumento (string)
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET || 'SECRET_KEY_SUPER_SECRETA_APEXFLOW',
      });

      // 3. Inyectamos los datos del payload en el cliente de forma segura
      client.user = {
        userId: payload.sub, // Recuerda que 'sub' guarda el ID del usuario en JwtStrategy
        email: payload.email,
        name: payload.name || 'Usuario Anónimo',
      };

      console.log(`Cliente autenticado conectado: ${client.user.name}`);
    } catch (error) {
      console.log('Conexión de WebSocket rechazada: No autenticado o Token expirado');
      client.disconnect(); // Desconectamos al socket intruso
    }
  }

  @SubscribeMessage('joinBoard')
  handleJoinBoard(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() boardId: string
  ): void {
    client.join(boardId);
  }

  @SubscribeMessage('moveTask')
  async handleMoveTask(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: MoveTaskDto
  ): Promise<void> {
    // Extraemos de forma 100% segura los datos inyectados durante el handshake
    const userId = client.user!.userId;
    const userName = client.user!.name;

    // 1. Procesamos el movimiento mandando los 3 argumentos que pide el servicio
    const { log } = await this.kanbanService.handleTaskMovement(data, userId, userName);

    // 2. Notificar el movimiento a los demás usuarios en el tablero
    this.server.to(data.boardId).emit('taskMoved', {
      taskId: data.taskId,
      fromColumnId: data.fromColumnId,
      toColumnId: data.toColumnId,
      newOrder: data.newOrder,
    });

    // 3. Notificar la nueva actividad con el nombre real de quién la hizo
    this.server.to(data.boardId).emit('newActivity', {
      message: log.message,
      createdAt: log.createdAt,
      userName: userName, // Enviado para pintar en caliente en el ActivitySidebar del frontend
    });
  }
}
