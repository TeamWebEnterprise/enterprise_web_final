import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // this module can use Globally
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // other module use PrismaService
})
export class PrismaModule {}
