/*
  Warnings:

  - Added the required column `avatarImageId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatarImageId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "AvatarImage" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "AvatarImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_avatarImageId_fkey" FOREIGN KEY ("avatarImageId") REFERENCES "AvatarImage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
