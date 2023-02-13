import { Injectable } from '@nestjs/common';
import { Idiea } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateIdieaDto } from './dto/create-idiea.dto';
import { UpdateIdieaDto } from './dto/update-idiea.dto';

@Injectable()
export class IdieaService {
  constructor(private prisma: PrismaService) {}

  async createNewIdiea(createIdieaDto: CreateIdieaDto): Promise<Idiea> {
    return this.prisma.idiea.create({
      data: createIdieaDto,
    });
  }

  create(createIdieaDto: CreateIdieaDto) {
    return 'This action adds a new idiea';
  }

  findAll() {
    return `This action returns all idiea`;
  }

  findOne(id: number) {
    return `This action returns a #${id} idiea`;
  }

  update(id: number, updateIdieaDto: UpdateIdieaDto) {
    return `This action updates a #${id} idiea`;
  }

  remove(id: number) {
    return `This action removes a #${id} idiea`;
  }
}
