import { MoveTaskPayload } from '@/kanban/interfaces/kanban-events.interface';

export class MoveTaskDto implements MoveTaskPayload {
  boardId!: string;
  taskId!: string;
  fromColumnId!: string;
  toColumnId!: string;
  newOrder!: number;
  taskTitle!: string;
  toColumnTitle!: string;
}
