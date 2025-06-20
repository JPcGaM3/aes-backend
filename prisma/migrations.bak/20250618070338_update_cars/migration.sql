/*
  Warnings:

  - You are about to drop the column `curr_val` on the `cars` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cars" DROP COLUMN "curr_val",
ADD COLUMN     "accum_dep" DOUBLE PRECISION,
ADD COLUMN     "curr_bk_val" DOUBLE PRECISION,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "service_life" INTEGER,
ALTER COLUMN "car_number" DROP NOT NULL,
ALTER COLUMN "asset" DROP NOT NULL,
ALTER COLUMN "capitalized_on" DROP NOT NULL,
ALTER COLUMN "cost_center" DROP NOT NULL,
ALTER COLUMN "hp" DROP NOT NULL,
ALTER COLUMN "acquis_val" DROP NOT NULL,
ALTER COLUMN "acquis_val" SET DATA TYPE DOUBLE PRECISION;
