/*
  Warnings:

  - You are about to drop the column `zone` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "zone",
ALTER COLUMN "unit" DROP NOT NULL;
