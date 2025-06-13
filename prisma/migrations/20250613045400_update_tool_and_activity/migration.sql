/*
  Warnings:

  - Made the column `name` on table `activities` required. This step will fail if there are existing NULL values in that column.
  - Made the column `activity_number` on table `activities` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "activities" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "activity_number" SET NOT NULL;
