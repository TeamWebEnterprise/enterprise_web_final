import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcrypt';
import { CheckUserInput } from './dto/check-user.input';
import SetNewPasswordDto from 'src/auth/dto/set-new-password.input';
import { verify } from 'jsonwebtoken';
import { throwError } from 'rxjs';
import { UpdateUserDto } from './dto/update-user-admin.input';
import { SetQAManagerDto } from './dto/set-qa-manager.input';
import { DepartmentPosition, Role } from './entities/role.enum';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    try {
      const data = await this.prisma.user.findMany({
        where: {
          active: true,
        },
        include: {
          Idiea: true,
        },
      });

      await data.forEach((dataItem) => {
        delete dataItem.password;
      });
      return data;
    } catch (error) {
      throwError;
    }
  }

  async findOne(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async findByUsername(username: string): Promise<User> {
    return this.prisma.user.findFirst({
      where: {
        username,
      },
    });
  }

  async createUser(createUserInput: CreateUserInput) {
    const userCheckAvailble = await this.prisma.user.findFirst({
      where: {
        OR: [
          { username: createUserInput.username },
          { email: createUserInput.email },
          { phone: createUserInput.phone },
        ],
      },
    });

    if (userCheckAvailble) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    try {
      const password = await bcrypt.hash(createUserInput.password, 10);
      return this.prisma.user.create({
        data: { ...createUserInput, password: password },
      });
    } catch {
      (e) => {
        throw e;
      };
    }
  }

  //Update User by Admin
  async updateUserAdmin(updateUserDto: UpdateUserDto) {
    try {
      const existingUser = await this.findOne(updateUserDto.userId);

      if (!existingUser) {
        return new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }

      return await this.prisma.user.update({
        where: {
          id: Number(updateUserDto.userId),
        },
        data: {
          roles: updateUserDto.roles,
        },
      });
    } catch (error) {
      throw BadRequestException;
    }
  }

  //Delete User by admin

  async deleteUserByAmin(userId: number) {
    try {
      return await this.prisma.user.update({
        include: {
          Idiea: true,
          Like: true,
          Comment: true,
        },
        where: {
          id: Number(userId),
        },
        data: {
          Idiea: {
            updateMany: {
              data: {
                active: false,
              },
              where: {
                userId: Number(userId),
              },
            },
          },
          Like: {
            updateMany: {
              data: {
                active: false,
              },
              where: {
                userId: Number(userId),
              },
            },
          },
          Comment: {
            updateMany: {
              data: {
                active: false,
              },
              where: {
                userId: Number(userId),
              },
            },
          },
          active: false,
        },
      });
    } catch (e) {
      return BadRequestException;
    }
  }

  async checkCreateUser(createUserInput: CheckUserInput) {
    console.log(createUserInput);
    const existUsername = await this.prisma.user.findFirst({
      where: {
        username: createUserInput.username,
      },
    });

    const existEmail = await this.prisma.user.findFirst({
      where: {
        email: createUserInput.email,
      },
    });
    const existPhone = await this.prisma.user.findFirst({
      where: {
        phone: createUserInput.phone,
      },
    });

    let resultUsernameCheck = true;
    let resultEmailCheck = true;
    let resultPhoneCheck = true;

    if (existUsername) {
      resultUsernameCheck = false;
    }
    if (existEmail) {
      resultEmailCheck = false;
    }
    if (existPhone) {
      resultPhoneCheck = false;
    }

    const result = {
      acceptEmailCheck: resultEmailCheck,
      acceptPhoneCheck: resultPhoneCheck,
      acceptUsernameCheck: resultUsernameCheck,
    };

    return result;
  }

  async markEmailAsConfirmed(email: string) {
    return this.prisma.user.update({
      where: {
        email: email,
      },
      data: {
        isEmailValidated: true,
      },
    });
  }

  async setNewPassword(setNewPasswordDto: SetNewPasswordDto, token: string) {
    if (setNewPasswordDto.password !== setNewPasswordDto.passwordConfirm) {
      throw new BadRequestException('Password confirm not match');
    }

    const payload = verify(token, process.env.JWT_RESETPASSWORD_TOKEN_SECRET);

    if (typeof payload === 'string') {
      throw new BadRequestException('Invalid Token');
    }

    const newPassword = await bcrypt.hash(setNewPasswordDto.password, 10);

    return this.prisma.user.update({
      where: {
        email: payload.email,
      },
      data: {
        password: newPassword,
      },
    });
  }

  private async setQAManagerRole(userId: number) {
    console.log('set role for: ' + userId);
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id: Number(userId),
        },
      });

      if (user.roles.includes(Role.QA_MANAGER)) {
        return;
      } else {
        await this.prisma.user.update({
          where: {
            id: Number(userId),
          },
          data: {
            roles: [Role.QA_MANAGER, ...user.roles],
          },
        });
      }
    } catch (error) {
      throw new HttpException(
        'can not set role for user',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async unSetQAManagerRole(userId: number) {
    console.log('unset role for: ' + userId);

    try {
      const currentUser = await this.prisma.user.findFirst({
        where: {
          id: Number(userId),
        },
      });
      const index = currentUser.roles.indexOf(Role.QA_MANAGER);
      currentUser.roles.splice(index, 1);
      await this.prisma.user.update({
        where: {
          id: Number(userId),
        },
        data: { roles: currentUser.roles },
      });
    } catch (error) {
      throw new HttpException(
        'can not set role for user',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async setQAManager(setQAManagerDto: SetQAManagerDto) {
    try {
      const checkexistingQAManager = await this.prisma.qADepartment.findFirst({
        where: {
          departmentId: Number(setQAManagerDto.departmentId),
          active: true,
          position: DepartmentPosition.QA_MANAGER,
        },
      });

      if (checkexistingQAManager) {
        if (checkexistingQAManager.userId == setQAManagerDto.userId) {
          throw new HttpException(
            'this user has been a QA Manager',
            HttpStatus.BAD_REQUEST,
          );
        }

        await this.prisma.qADepartment.updateMany({
          where: {
            departmentId: Number(setQAManagerDto.departmentId),
            active: true,
            position: DepartmentPosition.QA_MANAGER,
          },
          data: {
            active: false,
          },
        });

        await this.unSetQAManagerRole(checkexistingQAManager.userId);
      }

      await this.setQAManagerRole(setQAManagerDto.userId);

      return this.prisma.qADepartment.create({
        data: {
          userId: Number(setQAManagerDto.userId),
          departmentId: Number(setQAManagerDto.departmentId),
          position: DepartmentPosition.QA_MANAGER,
        },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException("can't set", HttpStatus.BAD_REQUEST);
    }
  }

  private async setQACoordinatorRole(userId: number) {
    console.log('set role Coordinator for: ' + userId);
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id: Number(userId),
        },
      });

      if (user.roles.includes(Role.QA_COORDINATOR)) {
        return;
      } else {
        await this.prisma.user.update({
          where: {
            id: Number(userId),
          },
          data: {
            roles: [Role.QA_COORDINATOR, ...user.roles],
          },
        });
      }
    } catch (error) {
      throw new HttpException(
        'can not set role for user',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async unSetQACoordinatorRole(userId: number) {
    console.log('unset role coor for: ' + userId);

    try {
      const currentUser = await this.prisma.user.findFirst({
        where: {
          id: Number(userId),
        },
      });
      const index = currentUser.roles.indexOf(Role.QA_COORDINATOR);
      currentUser.roles.splice(index, 1);
      await this.prisma.user.update({
        where: {
          id: Number(userId),
        },
        data: { roles: currentUser.roles },
      });
    } catch (error) {
      throw new HttpException(
        'can not set role for user',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async setQACoordinator(setQAManagerDto: SetQAManagerDto) {
    try {
      const checkQACoordinator = await this.prisma.qADepartment.findFirst({
        where: {
          departmentId: Number(setQAManagerDto.departmentId),
          active: true,
          position: DepartmentPosition.QA_COORDINATOR,
        },
      });

      if (checkQACoordinator) {
        if (checkQACoordinator.userId == setQAManagerDto.userId) {
          throw new HttpException(
            'this user has been a QA Coordinator',
            HttpStatus.BAD_REQUEST,
          );
        }

        await this.prisma.qADepartment.updateMany({
          where: {
            departmentId: Number(setQAManagerDto.departmentId),
            active: true,
            position: DepartmentPosition.QA_COORDINATOR,
          },
          data: {
            active: false,
          },
        });

        await this.unSetQACoordinatorRole(checkQACoordinator.userId);
      }

      await this.setQACoordinatorRole(setQAManagerDto.userId);

      return this.prisma.qADepartment.create({
        data: {
          userId: Number(setQAManagerDto.userId),
          departmentId: Number(setQAManagerDto.departmentId),
          position: DepartmentPosition.QA_COORDINATOR,
        },
      });
    } catch (error) {
      throw new HttpException("can't set", HttpStatus.BAD_REQUEST);
    }
  }
}
