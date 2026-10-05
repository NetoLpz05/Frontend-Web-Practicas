import { Inject, Injectable } from '@nestjs/common';
import type { ClaseRepository } from './dominio/clase.repository';
import type { Clase } from './dominio/entidades';
import { CLASE_REPOSITORY } from './clases.tokens';

@Injectable()
export class ClasesService {
    constructor(
        @Inject(CLASE_REPOSITORY)
        private readonly repository: ClaseRepository,
    ) {}

    listar(): Promise<Clase[]> {
        return this.repository.listar();
    }

    crear(nombre: string): Promise<Clase> {
        return this.repository.crear(nombre);
    }
}

