/*
  Warnings:

  - Made the column `activity_id` on table `tool_types` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tool_type_name` on table `tool_types` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "tool_types" ALTER COLUMN "activity_id" SET NOT NULL,
ALTER COLUMN "tool_type_name" SET NOT NULL;
