import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  await prisma.qADepartment.deleteMany();
  await prisma.department.deleteMany();
  await prisma.user.deleteMany();
  const alice = await prisma.user.create({
    data: {
      username: 'test',
      password: 'test',
      firstName: 'test',
      lastName: 'test',
      email: 'test@gmail.com',
      phone: 'test',
      address: 'test',
    },
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
