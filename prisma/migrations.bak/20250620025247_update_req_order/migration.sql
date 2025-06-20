/*
  Warnings:

  - You are about to drop the column `ap_month_year` on the `requestorders` table. All the data in the column will be lost.
  - You are about to drop the column `activity_id` on the `taskorders` table. All the data in the column will be lost.
  - You are about to drop the column `tool_type_id` on the `taskorders` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "taskorders" DROP CONSTRAINT "taskorders_activity_id_fkey";

-- DropForeignKey
ALTER TABLE "taskorders" DROP CONSTRAINT "taskorders_tool_type_id_fkey";

-- DropIndex
DROP INDEX "taskorders_activity_id_idx";

-- DropIndex
DROP INDEX "taskorders_tool_type_id_idx";

-- AlterTable
ALTER TABLE "requestorders" DROP COLUMN "ap_month_year",
ADD COLUMN     "ap_month" VARCHAR(255),
ADD COLUMN     "ap_year" INTEGER;

-- AlterTable
ALTER TABLE "taskorders" DROP COLUMN "activity_id",
DROP COLUMN "tool_type_id",
ADD COLUMN     "activities_id" INTEGER,
ADD COLUMN     "tool_types_id" INTEGER;

-- CreateIndex
CREATE INDEX "taskorders_activities_id_idx" ON "taskorders"("activities_id");

-- CreateIndex
CREATE INDEX "taskorders_tool_types_id_idx" ON "taskorders"("tool_types_id");

-- AddForeignKey
ALTER TABLE "taskorders" ADD CONSTRAINT "taskorders_activities_id_fkey" FOREIGN KEY ("activities_id") REFERENCES "activities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "taskorders" ADD CONSTRAINT "taskorders_tool_types_id_fkey" FOREIGN KEY ("tool_types_id") REFERENCES "tool_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
