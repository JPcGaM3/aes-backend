/*
  Warnings:

  - You are about to alter the column `operation_area` on the `operation_area` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "operation_area" ALTER COLUMN "operation_area" SET DATA TYPE VARCHAR(255);
