import { Module } from '@nestjs/common';
import { MiembrosModule } from '../miembros/miembros.module';
import { InscripcionesController } from './inscripciones.controller';
import { InscripcionesService } from './inscripciones.service';
import { INSCRIPCION_REPOSITORY } from './infra/inscripciones.tokens.';
import { HorarioPrismaRepository } from './infra/horario-prisma.repository';
import { InscripcionPrismaRepository } from './infra/inscripcion-prisma.repository';

@Module({
  imports: [MiembrosModule],
  controllers: [InscripcionesController],
  providers: [
    InscripcionesService,
    HorarioPrismaRepository,
    InscripcionPrismaRepository,
    {
      provide: INSCRIPCION_REPOSITORY,
      useClass: InscripcionPrismaRepository,
    },
  ],
})
export class InscripcionesModule {}
