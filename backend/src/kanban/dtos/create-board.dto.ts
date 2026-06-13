import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'El título del tablero debe tener al menos 3 caracteres.' })
  title!: string;
}
