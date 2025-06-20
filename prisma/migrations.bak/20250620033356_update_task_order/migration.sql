/*
  Warnings:

  - You are about to drop the column `supervisor_fullname` on the `requestorders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "requestorders" DROP COLUMN "supervisor_fullname",
ALTER COLUMN "active" DROP NOT NULL,
ALTER COLUMN "active" SET DEFAULT true;

-- AlterTable
ALTER TABLE "taskorders" ADD COLUMN     "active" BOOLEAN DEFAULT true;
