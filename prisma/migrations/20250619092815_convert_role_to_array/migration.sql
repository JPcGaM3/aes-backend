/*
  Warnings:

  - Changed the column `role` on the `users` table from a scalar field to a list field. If there are non-null values in that column, this step will fail.

*/
-- AlterTable
-- ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE "RoleEnum"[];

-- First create a temporary column that's an array type
ALTER TABLE "users" ADD COLUMN "role_array" "RoleEnum"[];

-- Copy existing data from role to role_array as a single-element array
UPDATE "users" SET "role_array" = ARRAY[role] WHERE role IS NOT NULL;

-- Drop the old column
ALTER TABLE "users" DROP COLUMN "role";

-- Rename the new column to the original name
ALTER TABLE "users" RENAME COLUMN "role_array" TO "role";
