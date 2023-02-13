/*
  Warnings:

  - You are about to drop the column `document` on the `Idiea` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,idieaId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Idiea" DROP COLUMN "document";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isEmailValidated" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "idieaId" INTEGER,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefeshToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "RefeshToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Like_userId_idieaId_key" ON "Like"("userId", "idieaId");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_idieaId_fkey" FOREIGN KEY ("idieaId") REFERENCES "Idiea"("id") ON DELETE SET NULL ON UPDATE CASCADE;
