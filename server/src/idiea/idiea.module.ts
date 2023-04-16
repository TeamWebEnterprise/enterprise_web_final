import { Module } from '@nestjs/common';
import { IdieaService } from './idiea.service';
import { IdieaController } from './idiea.controller';
import { PrismaService } from 'prisma/prisma.service';
import { CategoryModule } from 'src/category/category.module';
import { FileModule } from 'src/file/file.module';
import { EmailverifyModule } from 'src/emailverify/emailverify.module';

@Module({
  imports: [CategoryModule, FileModule, EmailverifyModule],
  controllers: [IdieaController],
  providers: [IdieaService, PrismaService],
})
export class IdieaModule {}
