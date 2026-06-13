import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  order!: number;

  @IsUUID('4', { message: 'El columnId debe ser un UUID válido.' })
  @IsNotEmpty()
  columnId!: string;
}
