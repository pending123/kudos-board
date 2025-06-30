/*
  Warnings:

  - You are about to drop the column `Author` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `Category` on the `Board` table. All the data in the column will be lost.
  - Added the required column `category` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Board" DROP COLUMN "Author",
DROP COLUMN "Category",
ADD COLUMN     "author" TEXT,
ADD COLUMN     "category" TEXT NOT NULL;
