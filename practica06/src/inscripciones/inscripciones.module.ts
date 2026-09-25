import { Module } from '@nestjs/common';
import { InscripcionesController } from './inscripciones.controller';
import { InscripcionesService } from './inscripciones.service';
import { INSCRIPCION_REPOSITORY } from './infra/inscripciones.tokens.';
import { InscripcionMemoriaRepository } from './infra/inscripcion-memoria.repository';

@Module({
  controllers: [InscripcionesController],
  providers: [InscripcionesService, {
    provide: INSCRIPCION_REPOSITORY,
    useClass: InscripcionMemoriaRepository,
  }],
})
export class InscripcionesModule {}
