/*
  Warnings:

  - You are about to drop the column `email` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `fullname` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `quota_number` on the `users` table. All the data in the column will be lost.
  - You are about to alter the column `username` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- DropForeignKey
ALTER TABLE "company_farm" DROP CONSTRAINT "company_farm_area_number_fkey";

-- DropIndex
DROP INDEX "users_email_key";

-- DropIndex
DROP INDEX "users_password_key";

-- AlterTable
ALTER TABLE "requestorders" ADD COLUMN     "unit_head_id" INTEGER,
ADD COLUMN     "work_order_number" VARCHAR(255);

-- AlterTable
ALTER TABLE "users" DROP COLUMN "email",
DROP COLUMN "fullname",
DROP COLUMN "password",
DROP COLUMN "quota_number",
ALTER COLUMN "username" SET DATA TYPE VARCHAR(255);

-- AddForeignKey
ALTER TABLE "company_farm" ADD CONSTRAINT "company_farm_area_number_fkey" FOREIGN KEY ("area_number") REFERENCES "operation_area"("area_number") ON DELETE NO ACTION ON UPDATE CASCADE;
