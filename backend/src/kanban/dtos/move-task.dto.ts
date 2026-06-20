import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { MoveTaskPayload } from '@/kanban/interfaces/kanban-events.interface';

export class MoveTaskDto implements MoveTaskPayload {
  @IsUUID('4')
  @IsNotEmpty()
  boardId!: string;

  @IsUUID('4')
  @IsNotEmpty()
  taskId!: string;

  @IsUUID('4')
  @IsNotEmpty()
  fromColumnId!: string;

  @IsUUID('4')
  @IsNotEmpty()
  toColumnId!: string;

  @IsNumber()
  newOrder!: number;

  @IsString()
  @IsNotEmpty()
  taskTitle!: string;

  @IsString()
  @IsNotEmpty()
  toColumnTitle!: string;
}
