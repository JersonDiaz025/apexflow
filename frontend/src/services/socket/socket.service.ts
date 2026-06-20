import { io } from 'socket.io-client';

export function createBoardSocket() {
    return io(process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:4000');
}
