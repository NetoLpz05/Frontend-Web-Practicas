import { Module } from '@nestjs/common';
import { ClasePrismaRepository } from './infra/clase-prisma.repository';
import { ClasesController } from './clases.controller';
import { ClasesService } from './clases.service';
import { CLASE_REPOSITORY } from './clases.tokens';

@Module({
  controllers: [ClasesController],
  providers: [
    ClasesService,
    {
      provide: CLASE_REPOSITORY,
      useClass: ClasePrismaRepository,
    },
  ],
})
export class ClasesModule {}
