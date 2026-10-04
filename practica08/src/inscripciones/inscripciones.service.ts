import { Inject, Injectable } from '@nestjs/common';
import type { InscripcionRepository } from './dominio/inscripcion.repository';
import { INSCRIPCION_REPOSITORY } from './infra/inscripciones.tokens.';
import { Inscripcion } from './dominio/entidades';
import { CrearInscripcionDto } from './dto/crear-inscripcion.dto';
import {
    CupoLlenoError,
    HorarioNoEncontradoError,
    InscripcionDuplicadaError,
    MiembroNoEncontradoError,
} from './dominio/errores';

@Injectable()
export class InscripcionesService {
    constructor(
        @Inject(INSCRIPCION_REPOSITORY)
        private readonly repository: InscripcionRepository,) {}

        listar(): Promise<Inscripcion[]>{
            return this.repository.listar();
        }

        buscar(id:number): Promise<Inscripcion | null>{
            return this.repository.buscarPorId(id);
        }

        async crear(dto: CrearInscripcionDto): Promise<Inscripcion> {
            const horario = await this.repository.buscarHorario(dto.horarioId);
            if (!horario) {
                throw new HorarioNoEncontradoError(dto.horarioId);
            }

            const miembro = await this.repository.buscarMiembro(dto.miembroId);
            if (!miembro) {
                throw new MiembroNoEncontradoError(dto.miembroId);
            }

            const delHorario = await this.repository.buscarPorHorario(dto.horarioId);
            const yaInscrito = delHorario.some(
            (inscripcion) => inscripcion.miembroId === 
            dto.miembroId && inscripcion.estado !== 'cancelada',);

            if (yaInscrito) {
                throw new InscripcionDuplicadaError(dto.horarioId, dto.miembroId);
            }

            const confirmadas = delHorario.filter((i) => i.estado === 'confirmada').length;

            if (confirmadas >= horario.cupoMaximo) {
                throw new CupoLlenoError(dto.horarioId, horario.cupoMaximo);
            }
            return this.repository.guardar({horarioId: dto.horarioId, miembroId: dto.miembroId})
        }

        cancelar(id: number): Promise<Inscripcion | null>{
            return this.repository.cancelar(id);
        }
}
