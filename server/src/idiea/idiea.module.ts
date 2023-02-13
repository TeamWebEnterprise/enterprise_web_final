import { Module } from '@nestjs/common';
import { IdieaService } from './idiea.service';
import { IdieaController } from './idiea.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [IdieaController],
  providers: [IdieaService, PrismaService],
})
export class IdieaModule {}
