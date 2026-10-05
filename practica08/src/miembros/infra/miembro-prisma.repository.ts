import { Injectable } from '@nestjs/common';
import type { ActualizarMiembroDto } from '../dto/actualizar-miembro.dto';
import type { CrearMiembroDto } from '../dto/crear-miembro.dto';
import type { MiembroRepository } from '../dominio/miembro.repository';
import type { Miembro } from '../dominio/entidades';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MiembroPrismaRepository implements MiembroRepository {
  constructor(private readonly prisma: PrismaService) {}

  listar(): Promise<Miembro[]> {
    return this.prisma.miembro.findMany({ orderBy: { id: 'asc' } });
  }

  buscarPorId(id: number): Promise<Miembro | null> {
    return this.prisma.miembro.findUnique({ where: { id } });
  }

  crear(datos: CrearMiembroDto): Promise<Miembro> {
    return this.prisma.miembro.create({ data: datos });
  }

  async actualizar(id: number, datos: ActualizarMiembroDto): Promise<Miembro | null> {
    const existente = await this.prisma.miembro.findUnique({ where: { id } });
    if (!existente) return null;

    return this.prisma.miembro.update({ where: { id }, data: datos });
  }

  async eliminar(id: number): Promise<Miembro | null> {
    const existente = await this.prisma.miembro.findUnique({ where: { id } });
    if (!existente) return null;

    return this.prisma.miembro.delete({ where: { id } });
  }
}