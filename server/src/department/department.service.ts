import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { SelectIdieaDepartmentDto } from './dto/select-idiea-department.input';

@Injectable()
export class DepartmentService {
  constructor(private prisma: PrismaService) {}

  getAll() {
    return this.prisma.department.findMany();
  }

  /* private async checkCoordinatorIsOwnerOfDepartment(
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
  } */

  async selectIdieaUnPublished(
    selectIdieaDepartmentDto: SelectIdieaDepartmentDto,
  ) {
    try {
      const QA = await this.prisma.qADepartment.findFirst({
        where: {
          userId: Number(selectIdieaDepartmentDto.userId),
        },
      });

      const departmentId = QA.departmentId;

      const result = await this.prisma.idiea.findMany({
        where: {
          user: {
            departmentId: Number(departmentId),
          },
          publish: false,
          active: true,
        },
        include: {
          _count: {
            select: {
              documents: true,
            },
          },
          user: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
          documents: true,
          categories: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      result.forEach((idiea) => {
        if (idiea.anonymous) {
          idiea.user.firstName = 'Anonymous';
          idiea.user.lastName = '';
        }
      });

      return result;
    } catch (error) {
      throw new HttpException(
        'You are not QA coordinator',
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
