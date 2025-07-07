/*
  Warnings:

  - You are about to drop the column `ae_area_id` on the `user_ae_area` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_ae_area" DROP CONSTRAINT "user_ae_area_ae_area_id_fkey";

-- DropIndex
DROP INDEX "user_ae_area_ae_area_id_idx";

-- AlterTable
ALTER TABLE "user_ae_area" DROP COLUMN "ae_area_id",
ADD COLUMN     "ae_id" INTEGER;

-- CreateIndex
CREATE INDEX "user_ae_area_ae_id_idx" ON "user_ae_area"("ae_id");

-- AddForeignKey
ALTER TABLE "user_ae_area" ADD CONSTRAINT "user_ae_area_ae_id_fkey" FOREIGN KEY ("ae_id") REFERENCES "ae_area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
