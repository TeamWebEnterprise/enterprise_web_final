import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.input';
import { UpdateCategoryDto } from './dto/update-category.input';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.category.findMany({
      where: {
        active: true,
      },
    });
  }

  createNewCategory(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  async updateCategory(updateCategoryDto: UpdateCategoryDto) {
    try {
      return this.prisma.category.update({
        where: { id: Number(updateCategoryDto.id) },
        data: {
          categoryName: updateCategoryDto.categoryName,
          description: updateCategoryDto.description,
        },
      });
    } catch (error) {
      return BadRequestException;
    }
  }

  async deleteCategory(categoryId: number) {
    try {
      const existingIdieaInCategory = this.prisma.category.findFirst({
        where: {
          id: Number(categoryId),
        },
        include: {
          idieas: true,
        },
      });

      console.log();

      if (existingIdieaInCategory.idieas.length < 1) {
        throw new HttpException(
          'Category cant be delete',
          HttpStatus.BAD_REQUEST,
        );
      }

      return this.prisma.category.update({
        where: {
          id: Number(categoryId),
        },
        data: {
          active: false,
        },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException('Bad req', HttpStatus.BAD_REQUEST);
    }
  }
}
