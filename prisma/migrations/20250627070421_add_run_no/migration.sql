/*
  Warnings:

  - You are about to drop the column `work_order_number` on the `requestorders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "requestorders" DROP COLUMN "work_order_number",
ADD COLUMN     "run_number" VARCHAR(255);
