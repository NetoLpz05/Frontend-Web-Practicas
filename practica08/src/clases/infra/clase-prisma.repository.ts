import { Injectable } from '@nestjs/common';
import type { ClaseRepository } from '../dominio/clase.repository';
import type { Clase } from '../dominio/entidades';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ClasePrismaRepository implements ClaseRepository {
  constructor(private readonly prisma: PrismaService) {}

  listar(): Promise<Clase[]> {
    return this.prisma.clase.findMany({
      select: { id: true, nombre: true },
      orderBy: { id: 'asc' },
    });
  }

  crear(nombre: string): Promise<Clase> {
    return this.prisma.clase.create({
      data: { nombre, duracionMin: 60 },
      select: { id: true, nombre: true },
    });
  }
}