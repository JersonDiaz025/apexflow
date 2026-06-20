import { Server, Socket } from 'socket.io';

export class AuthenticatedRequest {
  user!: {
    userId: string;
    email: string;
  };
}

export class AuthenticatedSocket extends Socket {
  user!: {
    userId: string;
    email: string;
    name: string;
  };
}
