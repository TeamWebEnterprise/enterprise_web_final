import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CommentController } from './comment.controller';

@Module({
  imports: [PrismaModule],
  controllers: [CommentController],
  providers: [CommentService, PrismaService],
})
export class CommentModule {}
