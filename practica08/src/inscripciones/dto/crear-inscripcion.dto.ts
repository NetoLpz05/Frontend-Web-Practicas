import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class CrearInscripcionDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  horarioId!: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  miembroId!: number;
}
