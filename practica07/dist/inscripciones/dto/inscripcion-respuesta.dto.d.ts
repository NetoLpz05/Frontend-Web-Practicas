import { Inscripcion } from '../dominio/entidades';
export interface InscripcionResponseDto {
    id: number;
    horarioId: number;
    miembroId: number;
    estado: string;
    creadaEn: string;
}
export declare function aInscripcionDto(i: Inscripcion): InscripcionResponseDto;
