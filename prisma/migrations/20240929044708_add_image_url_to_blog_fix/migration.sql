/*
  Warnings:

  - You are about to drop the column `imgaeUrl` on the `Blog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "imgaeUrl",
ADD COLUMN     "imageUrl" TEXT;
