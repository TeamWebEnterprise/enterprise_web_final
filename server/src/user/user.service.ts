import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { Console } from 'console';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcrypt';
import { CheckUserInput } from './dto/check-user.input';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        username: true,
        email: true,
        phone: true,
      },
    });
  }

  async findOne(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        id: id,
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
}
