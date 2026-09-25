import type { ActualizarMiembroDto } from './dto/actualizar-miembro.dto';
import type { CrearMiembroDto } from './dto/crear-miembro.dto';
import type { MiembroRepository } from './dominio/miembro.repository';
import type { Miembro } from './dominio/entidades';
export declare class MiembrosService {
    private readonly repository;
    constructor(repository: MiembroRepository);
    listar(): Promise<Miembro[]>;
    buscar(id: number): Promise<Miembro | null>;
    crear(datos: CrearMiembroDto): Promise<Miembro>;
    actualizar(id: number, datos: ActualizarMiembroDto): Promise<Miembro | null>;
    eliminar(id: number): Promise<Miembro | null>;
}
