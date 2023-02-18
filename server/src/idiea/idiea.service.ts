import { Injectable } from '@nestjs/common';
import { Idiea } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateIdieaDto } from './dto/create-idiea.dto';

@Injectable()
export class IdieaService {
  constructor(private prisma: PrismaService) {}

  async createNewIdiea(createIdieaDto: CreateIdieaDto): Promise<Idiea> {
    const { idCategory, ...inputCreateIdiea } = createIdieaDto;

    const newIdiea = await this.prisma.idiea.create({
      data: {
        ...inputCreateIdiea,
        anonymous: Boolean(createIdieaDto.anonymous),
      },
    });

    idCategory.forEach(async (id) => {
      await this.prisma.idiea.update({
        where: {
          id: newIdiea.id,
        },
        data: {
          categories: {
            connect: {
              id: Number(id),
            },
          },
        },
      });
    });

    return newIdiea;
  }

  create(createIdieaDto: CreateIdieaDto) {
    return 'This action adds a new idiea';
  }

  findAll() {
    return `This action returns all idiea`;
  }
}
