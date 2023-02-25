import { Injectable } from '@nestjs/common';
import { Idiea } from '@prisma/client';
import { Exception } from 'handlebars';
import { PrismaService } from 'prisma/prisma.service';
import { CreateIdieaDto } from './dto/create-idiea.dto';
import { CreateLikeDto } from './dto/create-like.input';

@Injectable()
export class IdieaService {
  constructor(private prisma: PrismaService) {}

  async createNewIdiea(
    createIdieaDto: CreateIdieaDto,
    userId: number,
  ): Promise<Idiea> {
    const { idCategory, ...inputCreateIdiea } = createIdieaDto;

    const newIdiea = await this.prisma.idiea.create({
      data: {
        ...inputCreateIdiea,
        anonymous: Boolean(createIdieaDto.anonymous === 'true'),
        userId: userId,
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

  async findAll(
    orderField: string | 'createdAt',
    orderBy: string,
    page: number,
  ) {
    try {
      const getAllIdieas = await this.prisma.idiea.findMany({
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
          categories: {
            select: {
              categoryName: true,
              id: true,
            },
            where: {
              active: true,
            },
          },
          comments: {
            select: {
              id: true,
              content: true,
              createdAt: true,
              anonymous: true,
              user: {
                select: {
                  lastName: true,
                  firstName: true,
                },
              },
            },
            orderBy: {
              createdAt: 'desc',
            },
            where: {
              active: true,
            },
          },
          likes: {
            select: {
              positive: true,
            },
            where: {
              active: true,
            },
          },
        },
        orderBy: {
          [orderField]: orderBy,
        },
        take: 5,
        skip: (page - 1) * 5,
        where: {
          active: true,
        },
      });

      getAllIdieas.forEach((idiea) => {
        if (idiea.anonymous) {
          idiea.user.firstName = 'Anonymous';
          idiea.user.lastName = '';
        }
        idiea.comments.forEach((comment) => {
          if (comment.anonymous) {
            comment.user.firstName = 'Anonymous';
            comment.user.lastName = '';
          }
        });
      });

      return getAllIdieas;
    } catch (e) {
      throw new Exception('Cant not get');
    }
  }

  async findAllSortByLike(page) {
    try {
      const getAllIdieas = await this.prisma.idiea.findMany({
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
          categories: {
            select: {
              categoryName: true,
              id: true,
            },
            where: {
              active: true,
            },
          },
          comments: {
            select: {
              id: true,
              content: true,
              createdAt: true,
              anonymous: true,
              user: {
                select: {
                  lastName: true,
                  firstName: true,
                },
              },
            },
            orderBy: {
              createdAt: 'desc',
            },
            where: {
              active: true,
            },
          },
          likes: {
            select: {
              positive: true,
            },
            where: {
              active: true,
            },
          },
        },
        orderBy: {
          likes: {
            _count: 'desc',
          },
        },
        take: 5,
        skip: (page - 1) * 5,
        where: {
          active: true,
        },
      });

      getAllIdieas.forEach((idiea) => {
        if (idiea.anonymous) {
          idiea.user.firstName = 'Anonymous';
          idiea.user.lastName = '';
        }
        idiea.comments.forEach((comment) => {
          if (comment.anonymous) {
            comment.user.firstName = 'Anonymous';
            comment.user.lastName = '';
          }
        });
      });

      return getAllIdieas;
    } catch (e) {
      throw new Exception('Cant not get');
    }
  }

  async like(userId: number, createLikeDto: CreateLikeDto) {
    try {
      const checkExistingLike = await this.prisma.like.findFirst({
        where: {
          AND: [{ userId: userId }, { idieaId: Number(createLikeDto.idieaId) }],
        },
      });

      if (checkExistingLike) {
        if (
          Boolean(createLikeDto.positive === 'true') ==
          checkExistingLike.positive
        ) {
          return await this.prisma.like.update({
            where: { id: checkExistingLike.id },
            data: {
              active: !checkExistingLike.active,
            },
          });
        } else {
          return await this.prisma.like.update({
            where: { id: checkExistingLike.id },
            data: {
              active: true,
              positive: Boolean(createLikeDto.positive === 'true'),
            },
          });
        }
      } else {
        return this.prisma.like.create({
          data: {
            userId: userId,
            idieaId: Number(createLikeDto.idieaId),
            positive: Boolean(createLikeDto.positive === 'true'),
          },
        });
      }
    } catch (e) {
      throw new Exception('cant not like');
    }
  }
}
