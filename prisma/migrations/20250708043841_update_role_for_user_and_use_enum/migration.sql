/*
  Warnings:

  - The `name` column on the `role` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "role" DROP COLUMN "name",
ADD COLUMN     "name" "RoleEnum";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role";
