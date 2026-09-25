import type { InscripcionRepository } from './dominio/inscripcion.repository';
import { Inscripcion } from './dominio/entidades';
import { CrearInscripcionDto } from './dto/crear-inscripcion.dto';
export declare class InscripcionesService {
    private readonly repository;
    constructor(repository: InscripcionRepository);
    listar(): Promise<Inscripcion[]>;
    buscar(id: number): Promise<Inscripcion | null>;
    crear(dto: CrearInscripcionDto): Promise<Inscripcion>;
    cancelar(id: number): Promise<Inscripcion | null>;
}
