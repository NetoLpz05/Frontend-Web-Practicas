import { Module } from '@nestjs/common';
import { MiembroMemoriaRepository } from './infra/miembro-memoria.repository';
import { MiembrosController } from './miembros.controller';
import { MiembrosService } from './miembros.service';
import { MIEMBRO_REPOSITORY } from './miembros.tokens';

@Module({
  controllers: [MiembrosController],
  providers: [
    MiembrosService,
    {
      provide: MIEMBRO_REPOSITORY,
      useClass: MiembroMemoriaRepository,
    },
  ],
})
export class MiembrosModule {}