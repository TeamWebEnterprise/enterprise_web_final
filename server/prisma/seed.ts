import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  await prisma.qADepartment.deleteMany();
  await prisma.department.deleteMany();
  await prisma.user.deleteMany();
  const alice = await prisma.user.create({
    data: {
      username: 'username',
      password: '$2b$10$uLCHSu5mIiAh6v0ezzogr.VTMZwtwKQvJOQ3C9iL4fYl8l6vkDzqu',
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
