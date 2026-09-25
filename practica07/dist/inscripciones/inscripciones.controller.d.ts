import { InscripcionesService } from './inscripciones.service';
import type { CrearInscripcionDto } from './dto/crear-inscripcion.dto';
import type { Response } from 'express';
export declare class InscripcionesController {
    private readonly sercivio;
    constructor(sercivio: InscripcionesService);
    listar(): Promise<import("./dto/inscripcion-respuesta.dto").InscripcionResponseDto[]>;
    buscar(id: string): Promise<import("./dto/inscripcion-respuesta.dto").InscripcionResponseDto>;
    crear(dto: CrearInscripcionDto, res: Response): Promise<import("./dto/inscripcion-respuesta.dto").InscripcionResponseDto>;
    cancelar(id: string): Promise<import("./dto/inscripcion-respuesta.dto").InscripcionResponseDto>;
}
