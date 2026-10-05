import { Inject, Injectable } from '@nestjs/common';
import type { MiembroRepository } from '../../miembros/dominio/miembro.repository';
import { MIEMBRO_REPOSITORY } from '../../miembros/miembros.tokens';
import { PrismaService } from '../../prisma/prisma.service';
import type { Horario, Inscripcion, Miembro, NuevaInscripcion } from '../dominio/entidades';
import type { InscripcionRepository } from '../dominio/inscripcion.repository';
import { HorarioPrismaRepository } from './horario-prisma.repository';

@Injectable()
export class InscripcionPrismaRepository implements InscripcionRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly horarios: HorarioPrismaRepository,
    @Inject(MIEMBRO_REPOSITORY)
    private readonly miembros: MiembroRepository,
  ) {}

  listar(): Promise<Inscripcion[]> {
    return this.prisma.inscripcion.findMany({ orderBy: { id: 'asc' } });
  }

  buscarPorId(id: number): Promise<Inscripcion | null> {
    return this.prisma.inscripcion.findUnique({ where: { id } });
  }

  buscarPorHorario(horarioId: number): Promise<Inscripcion[]> {
    return this.prisma.inscripcion.findMany({ where: { horarioId } });
  }

  buscarHorario(horarioId: number): Promise<Horario | null> {
    return this.horarios.buscarPorId(horarioId);
  }

  buscarMiembro(miembroId: number): Promise<Miembro | null> {
    return this.miembros.buscarPorId(miembroId);
  }

  guardar(datos: NuevaInscripcion): Promise<Inscripcion> {
    return this.prisma.inscripcion.upsert({
      where: {
        horarioId_miembroId: {
          horarioId: datos.horarioId,
          miembroId: datos.miembroId,
        },
      },
      create: datos,
      update: { estado: 'confirmada' },
    });
  }

  async cancelar(id: number): Promise<Inscripcion | null> {
    const existente = await this.prisma.inscripcion.findUnique({ where: { id } });
    if (!existente) return null;

    return this.prisma.inscripcion.update({
      where: { id },
      data: { estado: 'cancelada' },
    });
  }
}