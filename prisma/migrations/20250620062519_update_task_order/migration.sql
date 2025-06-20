/*
  Warnings:

  - You are about to drop the column `area_actual` on the `taskorders` table. All the data in the column will be lost.
  - You are about to drop the column `area_target` on the `taskorders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "taskorders" DROP COLUMN "area_actual",
DROP COLUMN "area_target",
ADD COLUMN     "actual_area" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "target_area" DOUBLE PRECISION DEFAULT 0;
