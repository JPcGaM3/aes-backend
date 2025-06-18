/*
  Warnings:

  - You are about to drop the column `ae` on the `tools` table. All the data in the column will be lost.
  - You are about to drop the column `ae_number` on the `tools` table. All the data in the column will be lost.
  - You are about to drop the column `ae` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "tools" DROP CONSTRAINT "tools_ae_number_fkey";

-- AlterTable
ALTER TABLE "tools" DROP COLUMN "ae",
DROP COLUMN "ae_number";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "ae",
ADD COLUMN     "ae_id" INTEGER;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_ae_id_fkey" FOREIGN KEY ("ae_id") REFERENCES "ae_area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tools" ADD CONSTRAINT "tools_ae_id_fkey" FOREIGN KEY ("ae_id") REFERENCES "ae_area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
