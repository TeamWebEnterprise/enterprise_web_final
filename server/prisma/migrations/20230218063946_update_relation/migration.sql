/*
  Warnings:

  - You are about to drop the `CategoryDetail` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[avatarImageId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "CategoryDetail" DROP CONSTRAINT "CategoryDetail_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoryDetail" DROP CONSTRAINT "CategoryDetail_idieaId_fkey";

-- DropTable
DROP TABLE "CategoryDetail";

-- CreateTable
CREATE TABLE "_CategoryToIdiea" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToIdiea_AB_unique" ON "_CategoryToIdiea"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToIdiea_B_index" ON "_CategoryToIdiea"("B");

-- CreateIndex
CREATE UNIQUE INDEX "User_avatarImageId_key" ON "User"("avatarImageId");

-- AddForeignKey
ALTER TABLE "_CategoryToIdiea" ADD CONSTRAINT "_CategoryToIdiea_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToIdiea" ADD CONSTRAINT "_CategoryToIdiea_B_fkey" FOREIGN KEY ("B") REFERENCES "Idiea"("id") ON DELETE CASCADE ON UPDATE CASCADE;
