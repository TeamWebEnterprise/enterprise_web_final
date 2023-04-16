import { PrismaClient } from '@prisma/client';
import { BASE_CATEGORIES, BASE_DEPARTMENT, BASE_USER } from './basedata';
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

  await BASE_DEPARTMENT.forEach(
    async (department) =>
      await prisma.department.create({
        data: { defartmentName: department.departmentName, id: department.id },
      }),
  );

  await BASE_USER.forEach(async (user) => {
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

    await prisma.qADepartment.create({
      data: {
        userId: user.id,
        departmentId: user.id,
      },
    });
  });

  await BASE_CATEGORIES.forEach(
    async (category) =>
      await prisma.category.create({
        data: category,
      }),
  );

  setTimeout(
    () =>
      BASE_USER.forEach(async (user) => {
        const { Idiea, ...inputUser } = user;

        await prisma.user.update({
          where: { id: inputUser.id },
          data: {
            departmentId: inputUser.id,
            isEmailValidated: true,
          },
        });
      }),
    5000,
  );
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
