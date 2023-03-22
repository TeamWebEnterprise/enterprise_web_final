-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_avatarImageId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "avatarImageId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_avatarImageId_fkey" FOREIGN KEY ("avatarImageId") REFERENCES "AvatarImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
