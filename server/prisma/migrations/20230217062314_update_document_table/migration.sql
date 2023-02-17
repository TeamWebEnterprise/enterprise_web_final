/*
  Warnings:

  - You are about to drop the column `name` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Document` table. All the data in the column will be lost.
  - Added the required column `key` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Document" DROP COLUMN "name",
DROP COLUMN "size",
DROP COLUMN "type",
ADD COLUMN     "key" TEXT NOT NULL,
ADD COLUMN     "public" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "url" TEXT NOT NULL;
