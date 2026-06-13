import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateColumnDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsNumber()
  order!: number;

  @IsUUID('4', { message: 'El boardId debe ser un UUID válido.' })
  @IsNotEmpty()
  boardId!: string;
}
