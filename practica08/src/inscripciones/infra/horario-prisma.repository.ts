import { Injectable } from '@nestjs/common';
import type { Horario } from '../dominio/entidades';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class HorarioPrismaRepository {
  constructor(private readonly prisma: PrismaService) {}

  buscarPorId(id: number): Promise<Horario | null> {
    return this.prisma.horario.findUnique({
      where: { id },
      select: {
        id: true,
        claseId: true,
        dia: true,
        horaInicio: true,
        cupoMaximo: true,
        entrenador: true,
      },
    });
  }
}