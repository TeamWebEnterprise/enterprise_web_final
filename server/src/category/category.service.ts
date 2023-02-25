import { BadRequestException, Injectable } from '@nestjs/common';
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
      return this.prisma.category.update({
        where: {
          id: Number(categoryId),
        },
        data: {
          active: false,
        },
      });
    } catch (error) {
      return BadRequestException;
    }
  }
}
