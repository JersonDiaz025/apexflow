import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
export class CreateBoardDto {
  @IsString({ message: 'El título debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El título del tablero es requerido.' })
  @MinLength(3, { message: 'El título del tablero debe tener al menos 3 caracteres.' })
  @MaxLength(50, { message: 'El título no puede superar los 50 caracteres.' })
  title!: string;

  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  @IsOptional()
  @MaxLength(255, { message: 'La descripción no puede superar los 255 caracteres.' })
  description?: string;
}
