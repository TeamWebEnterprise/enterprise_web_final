import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { SelectIdieaDepartmentDto } from './dto/select-idiea-department.input';

@Injectable()
export class DepartmentService {
  constructor(private prisma: PrismaService) {}

  getAll() {
    return this.prisma.department.findMany();
  }

  private async checkCoordinatorIsOwnerOfDepartment(
    selectIdieaDepartmentDto: SelectIdieaDepartmentDto,
  ): Promise<Boolean> {
    try {
      const thisUser = await this.prisma.qADepartment.findFirst({
        where: {
          userId: Number(selectIdieaDepartmentDto.userId),
        },
        include: {
          department: {
            select: {
              id: true,
            },
          },
        },
      });
      return thisUser.department.id == selectIdieaDepartmentDto.departmentId;
    } catch (error) {
      throw new HttpException('cant find', HttpStatus.BAD_REQUEST);
    }
  }

  async selectIdieaUnPublished(
    selectIdieaDepartmentDto: SelectIdieaDepartmentDto,
  ) {
    try {
      if (
        (await this.checkCoordinatorIsOwnerOfDepartment(
          selectIdieaDepartmentDto,
        )) == true
      ) {
        return this.prisma.idiea.findMany({
          where: {
            user: {
              departmentId: Number(selectIdieaDepartmentDto.departmentId),
            },
            publish: false,
          },
        });
      }
    } catch (error) {
      throw new HttpException(
        'You are not QA coordinator of this department',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async selectIdieaPublished(departmentId: number) {
    try {
      return this.prisma.idiea.findMany({
        where: {
          user: {
            departmentId: Number(departmentId),
          },
          publish: true,
        },
      });
    } catch (error) {
      throw new HttpException('cant get', HttpStatus.BAD_REQUEST);
    }
  }
}
