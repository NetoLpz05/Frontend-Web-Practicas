import { Inject, Injectable } from '@nestjs/common';
import type { ActualizarMiembroDto } from './dto/actualizar-miembro.dto';
import type { CrearMiembroDto } from './dto/crear-miembro.dto';
import type { MiembroRepository } from './dominio/miembro.repository';
import type { Miembro } from './dominio/entidades';
import { MIEMBRO_REPOSITORY } from './miembros.tokens';

@Injectable()
export class MiembrosService {
  constructor(
    @Inject(MIEMBRO_REPOSITORY)
    private readonly repository: MiembroRepository,
  ) {}

  listar(): Promise<Miembro[]> {
    return this.repository.listar();
  }

  buscar(id: number): Promise<Miembro | null> {
    return this.repository.buscarPorId(id);
  }

  crear(datos: CrearMiembroDto): Promise<Miembro> {
    return this.repository.crear(datos);
  }

  actualizar(id: number, datos: ActualizarMiembroDto): Promise<Miembro | null> {
    return this.repository.actualizar(id, datos);
  }

  eliminar(id: number): Promise<Miembro | null> {
    return this.repository.eliminar(id);
  }
}