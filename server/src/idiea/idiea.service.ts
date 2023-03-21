import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Idiea } from '@prisma/client';
import { IoTThingsGraph } from 'aws-sdk';
import { Exception } from 'handlebars';
import { PrismaService } from 'prisma/prisma.service';
import { EmailverifyService } from 'src/emailverify/emailverify.service';
import { CreateIdieaDto } from './dto/create-idiea.dto';
import { CreateLikeDto } from './dto/create-like.input';
import { DeleteIdieaDto } from './dto/delete-idiea.input';
import { MakeIdieaPublishDto } from './dto/make-publish-idiea.input';
import { UpdateIdieaDto } from './dto/update-idiea.input';

@Injectable()
export class IdieaService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailverifyService,
  ) {}

  async createNewIdiea(
    createIdieaDto: CreateIdieaDto,
    userId: number,
  ): Promise<Idiea> {
    const { idCategory, ...inputCreateIdiea } = createIdieaDto;
    var closeCommentAt = new Date();
    closeCommentAt.setDate(closeCommentAt.getDate() + 3);
    var closeIdieaAt = new Date();
    closeIdieaAt.setDate(closeIdieaAt.getDate() + 1);
    const newIdiea = await this.prisma.idiea.create({
      data: {
        ...inputCreateIdiea,
        anonymous: Boolean(createIdieaDto.anonymous == 'true'),
        closeCommentAt: closeCommentAt.toJSON(),
        closeIdieaAt: closeIdieaAt.toJSON(),
        userId: userId,
      },
    });

    if (idCategory) {
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
    }

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
              userId: true,
              positive: true,
            },
            where: {
              active: true,
            },
          },
          documents: true,
        },
        orderBy: {
          [orderField]: orderBy,
        },
        where: {
          active: true,
          publish: true,
        },
      });

      let result = [];

      result = await getAllIdieas.slice((page - 1) * 5, (page - 1) * 5 + 5);

      result.forEach((idiea) => {
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

      return { idieas: result, pages: this.getPagesNum(getAllIdieas.length) };
    } catch (e) {
      throw new Exception('Cant not get');
    }
  }

  private getPagesNum(pages: number) {
    if (pages <= 5) {
      return 1;
    } else if (pages % 5 == 0) {
      return pages / 5;
    } else {
      return (pages - (pages % 5)) / 5 + 1;
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
              userId: true,
              positive: true,
            },
            where: {
              active: true,
            },
          },
          documents: true,
        },
        orderBy: {
          likes: {
            _count: 'desc',
          },
        },
        where: {
          active: true,
          publish: true,
        },
      });

      let result = [];

      result = await getAllIdieas.slice((page - 1) * 5, (page - 1) * 5 + 5);

      result.forEach((idiea) => {
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

      return { idieas: result, pages: this.getPagesNum(getAllIdieas.length) };
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

  async updateIdiea(updateIdieaDto: UpdateIdieaDto) {
    try {
      let updatedIdiea = await this.prisma.idiea.update({
        where: { id: Number(updateIdieaDto.idieaId) },
        data: {
          content: updateIdieaDto.content,
          anonymous: Boolean(updateIdieaDto.anonymous == 'true'),
          closeIdieaAt: updateIdieaDto.closeIdieaAt,
        },
        include: {
          categories: true,
        },
      });

      if (updateIdieaDto.idCategory) {
        updatedIdiea.categories.forEach(async (category) => {
          await this.prisma.idiea.update({
            where: {
              id: Number(updatedIdiea.id),
            },
            data: {
              categories: {
                disconnect: {
                  id: Number(category.id),
                },
              },
            },
          });
        });

        updateIdieaDto.idCategory.forEach(async (id) => {
          await this.prisma.idiea.update({
            where: {
              id: Number(updatedIdiea.id),
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
      }

      return updatedIdiea;
    } catch (error) {
      console.log(error);
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  deleteAllDocument(idieaId: number) {
    console.log('delete file');
    try {
      return this.prisma.idiea.update({
        where: {
          id: Number(idieaId),
        },
        data: {
          documents: {
            updateMany: {
              data: {
                active: false,
              },
              where: {
                idieaId: Number(idieaId),
              },
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Cant not delete Document',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteIdiea(deleteIdieaDto: DeleteIdieaDto) {
    await this.prisma.like.updateMany({
      where: {
        idieaId: Number(deleteIdieaDto.idieaId),
      },
      data: { active: false },
    });

    await this.prisma.comment.updateMany({
      where: {
        idieaId: Number(deleteIdieaDto.idieaId),
      },
      data: { active: false },
    });

    return this.prisma.idiea.update({
      where: { id: Number(deleteIdieaDto.idieaId) },
      data: {
        active: false,
      },
    });
  }

  async checkUserIsOwner(userId: number, idieaId: number) {
    const currentIdiea = await this.prisma.idiea.findFirst({
      where: {
        id: Number(idieaId),
      },
    });

    if (currentIdiea.userId == Number(userId)) {
      return true;
    } else {
      return false;
    }
  }

  async makePublishIdiea(makeIdieaPublishDto: MakeIdieaPublishDto) {
    try {
      const idiea = await this.prisma.idiea.update({
        where: {
          id: Number(makeIdieaPublishDto.idieaId),
        },
        data: {
          publish: true,
        },
        include: {
          user: {
            select: {
              email: true,
              id: true,
            },
          },
        },
      });

      await this.emailService.sendMailForPublishIdiea({
        userId: idiea.user.id,
        content: idiea.content,
        closeIdieaAt: idiea.closeIdieaAt,
        closeCommentAt: idiea.closeCommentAt,
      });
      return idiea;
    } catch (error) {
      throw new HttpException('cant set', HttpStatus.BAD_REQUEST);
    }
  }

  async getAllIdieasByLikePoint(page: number) {
    const allIdieasLikeCount = await this.prisma.idiea.findMany({
      include: {
        _count: {
          select: {
            likes: {
              where: {
                positive: true,
                active: true,
              },
            },
          },
        },
        likes: {
          where: {
            active: true,
          },
        },
        comments: {
          include: {
            user: true,
          },
          where: {
            active: true,
          },
        },
        documents: {
          where: {
            active: true,
          },
        },
        categories: {
          where: {
            active: true,
          },
        },
        user: true,
      },
      where: {
        active: true,
        publish: true,
      },
    });

    const allIdieaDislikeCount = await this.prisma.idiea.findMany({
      select: {
        id: true,
        _count: {
          select: {
            likes: {
              where: {
                positive: false,
                active: true,
              },
            },
          },
        },
      },
      where: {
        active: true,
        publish: true,
      },
    });

    let result = [];

    for (let i = 0; i < allIdieasLikeCount.length; i++) {
      const newItem = {
        ...allIdieasLikeCount[i],
        totalPoint:
          allIdieasLikeCount[i]._count.likes -
          allIdieaDislikeCount[i]._count.likes,
      };
      result[i] = await newItem;
    }

    result = await result.sort((a, b) => b.totalPoint - a.totalPoint);

    const pages = this.getPagesNum(result.length);

    result = await result.slice((page - 1) * 5, (page - 1) * 5 + 5);

    result.forEach((idiea) => {
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

    return { idieas: result, pages: pages };
  }

  async getAllIdieaByLastestComment(page: number) {
    const allIdieas = await this.prisma.idiea.findMany({
      where: {
        publish: true,
        active: true,
      },
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
            userId: true,
            positive: true,
          },
          where: {
            active: true,
          },
        },
        documents: true,
      },
    });

    let result = [];
    result = await allIdieas.filter((idiea) => idiea.comments.length != 0);

    result = await result.sort((a, b) => {
      const date1 = new Date(a.comments[0].createdAt);
      const date2 = new Date(b.comments[0].createdAt);
      if (date1 > date2) {
        return -1;
      } else if (date1 < date2) {
        return 1;
      } else {
        return 0;
      }
    });
    const pages = this.getPagesNum(result.length);

    result = await result.slice((page - 1) * 5, (page - 1) * 5 + 5);

    result.forEach((idiea) => {
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

    return { idieas: result, pages: pages };
  }

  async getAllIdieasByUser(page: number, userId: number) {
    const allIdieas = await this.prisma.idiea.findMany({
      where: {
        userId: Number(userId),
        publish: true,
        active: true,
      },
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
            userId: true,
            positive: true,
          },
          where: {
            active: true,
          },
        },
        documents: true,
      },
    });

    let result = allIdieas;
    const pages = this.getPagesNum(result.length);

    result = await result.slice((page - 1) * 5, (page - 1) * 5 + 5);

    result.forEach((idiea) => {
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

    return { idieas: result, pages: pages };
  }
}
