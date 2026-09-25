import { Inscripcion, NuevaInscripcion } from '../dominio/entidades';
import { InscripcionRepository } from '../dominio/inscripcion.repository';
export declare class InscripcionMemoriaRepository implements InscripcionRepository {
    private inscripciones;
    private siguienteId;
    listar(): Promise<Inscripcion[]>;
    buscarPorId(id: number): Promise<Inscripcion | null>;
    buscarPorHorario(horarioId: number): Promise<Inscripcion[]>;
    buscarHorario(horarioId: number): Promise<import("../dominio/entidades").Horario | null>;
    buscarMiembro(miembroId: number): Promise<import("../dominio/entidades").Miembro | null>;
    guardar(datos: NuevaInscripcion): Promise<Inscripcion>;
    cancelar(id: number): Promise<Inscripcion | null>;
}
