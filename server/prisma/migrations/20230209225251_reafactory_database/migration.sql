/*
  Warnings:

  - You are about to drop the column `qADepartmentId` on the `Department` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[departmentId]` on the table `QADepartment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `defartmentName` to the `Department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departmentId` to the `QADepartment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Department" DROP CONSTRAINT "Department_qADepartmentId_fkey";

-- AlterTable
ALTER TABLE "Department" DROP COLUMN "qADepartmentId",
ADD COLUMN     "defartmentName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "QADepartment" ADD COLUMN     "departmentId" INTEGER NOT NULL,
ADD COLUMN     "position" TEXT NOT NULL DEFAULT 'QA';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "departmentId" INTEGER,
ADD COLUMN     "roles" TEXT[] DEFAULT ARRAY['Staff']::TEXT[];

-- CreateTable
CREATE TABLE "Idiea" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "document" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "closeIdieaAt" TIMESTAMP(3),
    "closeCommentAt" TIMESTAMP(3),
    "anonymous" BOOLEAN NOT NULL,

    CONSTRAINT "Idiea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "anonymous" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,
    "idieaId" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "id" SERIAL NOT NULL,
    "positive" BOOLEAN NOT NULL DEFAULT true,
    "userId" INTEGER NOT NULL,
    "idieaId" INTEGER NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "categoryName" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryDetail" (
    "id" SERIAL NOT NULL,
    "idieaId" INTEGER,
    "categoryId" INTEGER,

    CONSTRAINT "CategoryDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QADepartment_departmentId_key" ON "QADepartment"("departmentId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QADepartment" ADD CONSTRAINT "QADepartment_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_idieaId_fkey" FOREIGN KEY ("idieaId") REFERENCES "Idiea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_idieaId_fkey" FOREIGN KEY ("idieaId") REFERENCES "Idiea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryDetail" ADD CONSTRAINT "CategoryDetail_idieaId_fkey" FOREIGN KEY ("idieaId") REFERENCES "Idiea"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryDetail" ADD CONSTRAINT "CategoryDetail_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
