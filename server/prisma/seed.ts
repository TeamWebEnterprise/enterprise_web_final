import { PrismaClient } from '@prisma/client';
import { BASE_USER } from './basedata';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
async function main() {
  const password = await bcrypt.hash('123456', 10);
  await prisma.qADepartment.deleteMany();
  await prisma.department.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.like.deleteMany();
  await prisma.avatarImage.deleteMany();
  await prisma.avatarImage.deleteMany();
  await prisma.document.deleteMany();
  await prisma.category.deleteMany();
  await prisma.idiea.deleteMany();
  await prisma.user.deleteMany();

  BASE_USER.forEach(async (user) => {
    const { Idiea, ...inputUser } = user;

    await prisma.user.create({
      data: {
        ...inputUser,
        password: password,
        Idiea: {
          createMany: {
            data: user.Idiea,
          },
        },
      },
    });
  });
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
