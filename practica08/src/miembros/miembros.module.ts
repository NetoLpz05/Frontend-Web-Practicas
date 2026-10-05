import { Module } from '@nestjs/common';
import { MiembroPrismaRepository } from './infra/miembro-prisma.repository';
import { MiembrosController } from './miembros.controller';
import { MiembrosService } from './miembros.service';
import { MIEMBRO_REPOSITORY } from './miembros.tokens';

@Module({
  controllers: [MiembrosController],
  providers: [
    MiembrosService,
    {
      provide: MIEMBRO_REPOSITORY,
      useClass: MiembroPrismaRepository,
    },
  ],
  exports: [MIEMBRO_REPOSITORY],
})
export class MiembrosModule {}