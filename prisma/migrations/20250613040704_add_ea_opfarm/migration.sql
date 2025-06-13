/*
  Warnings:

  - You are about to alter the column `zone` on the `company_farm` table. The data in that column could be lost. The data in that column will be cast from `VarChar` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "company_farm" ALTER COLUMN "zone" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "operation_area" ADD COLUMN     "ae" VARCHAR(255);
