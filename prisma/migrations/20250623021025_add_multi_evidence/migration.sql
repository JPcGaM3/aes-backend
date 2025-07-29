/*
  Warnings:

  - The `evidence` column on the `requestorders` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "requestorders" DROP CONSTRAINT "requestorders_evidence_fkey";

-- AlterTable
ALTER TABLE "requestorders" DROP COLUMN "evidence",
ADD COLUMN     "evidence" INTEGER[];
