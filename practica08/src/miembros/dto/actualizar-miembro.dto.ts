import { IsBoolean, IsEmail, IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ActualizarMiembroDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nombre?: string;

  @IsOptional()
  @IsEmail()
  correo?: string;

  @IsOptional()
  @IsIn(['premium', 'plus', 'basica'])
  membresia?: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}