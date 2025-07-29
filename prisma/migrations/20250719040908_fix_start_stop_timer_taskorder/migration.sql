/*
  Warnings:

  - The `start_timer` column on the `taskorders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `end_timer` column on the `taskorders` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "taskorders" DROP COLUMN "start_timer",
ADD COLUMN     "start_timer" DATE,
DROP COLUMN "end_timer",
ADD COLUMN     "end_timer" DATE;
