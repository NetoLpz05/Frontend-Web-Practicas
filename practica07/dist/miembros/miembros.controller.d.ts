import type { ActualizarMiembroDto } from './dto/actualizar-miembro.dto';
import type { CrearMiembroDto } from './dto/crear-miembro.dto';
import { MiembrosService } from './miembros.service';
export declare class MiembrosController {
    private readonly miembrosService;
    constructor(miembrosService: MiembrosService);
    listar(): Promise<import("./dominio/entidades").Miembro[]>;
    buscar(id: number): Promise<import("./dominio/entidades").Miembro>;
    crear(datos: CrearMiembroDto): Promise<import("./dominio/entidades").Miembro>;
    actualizar(id: number, datos: ActualizarMiembroDto): Promise<import("./dominio/entidades").Miembro>;
    eliminar(id: number): Promise<import("./dominio/entidades").Miembro>;
}
