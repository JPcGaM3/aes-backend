/*
  Warnings:

  - You are about to drop the column `activity_describe` on the `requestorders` table. All the data in the column will be lost.
  - You are about to drop the column `ae` on the `requestorders` table. All the data in the column will be lost.
  - You are about to drop the column `affiliation` on the `requestorders` table. All the data in the column will be lost.
  - You are about to drop the column `attachmentId` on the `requestorders` table. All the data in the column will be lost.
  - You are about to drop the column `customer_type` on the `requestorders` table. All the data in the column will be lost.
  - You are about to drop the column `farm_name` on the `requestorders` table. All the data in the column will be lost.
  - You are about to drop the column `on_live` on the `requestorders` table. All the data in the column will be lost.
  - You are about to drop the column `tool_describe` on the `requestorders` table. All the data in the column will be lost.
  - You are about to drop the column `unit` on the `requestorders` table. All the data in the column will be lost.
  - The `evidence` column on the `requestorders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `area_number` on the `taskorders` table. All the data in the column will be lost.
  - Added the required column `active` to the `requestorders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "requestorders" DROP CONSTRAINT "requestorders_attachmentId_fkey";

-- AlterTable
ALTER TABLE "requestorders" DROP COLUMN "activity_describe",
DROP COLUMN "ae",
DROP COLUMN "affiliation",
DROP COLUMN "attachmentId",
DROP COLUMN "customer_type",
DROP COLUMN "farm_name",
DROP COLUMN "on_live",
DROP COLUMN "tool_describe",
DROP COLUMN "unit",
ADD COLUMN     "active" BOOLEAN NOT NULL,
ADD COLUMN     "ae_id" INTEGER,
ADD COLUMN     "comment" TEXT,
ADD COLUMN     "company_farm_id" INTEGER,
ADD COLUMN     "customer_type_id" INTEGER,
ADD COLUMN     "farmer_name" VARCHAR(255),
ADD COLUMN     "operation_area_id" INTEGER,
ALTER COLUMN "ap_month_year" DROP NOT NULL,
ALTER COLUMN "zone" DROP NOT NULL,
ALTER COLUMN "zone" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "target_area" SET DEFAULT 0,
ALTER COLUMN "target_area" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "actual_area" SET DEFAULT 0,
ALTER COLUMN "actual_area" SET DATA TYPE DOUBLE PRECISION,
DROP COLUMN "evidence",
ADD COLUMN     "evidence" INTEGER;

-- AlterTable
ALTER TABLE "taskorders" DROP COLUMN "area_number",
ALTER COLUMN "area_target" SET DEFAULT 0,
ALTER COLUMN "area_target" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "area_actual" SET DEFAULT 0,
ALTER COLUMN "area_actual" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "ap_date" DROP NOT NULL,
ALTER COLUMN "car_start_hour" DROP NOT NULL,
ALTER COLUMN "car_end_hour" DROP NOT NULL,
ALTER COLUMN "start_timer" DROP NOT NULL,
ALTER COLUMN "end_timer" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "requestorders" ADD CONSTRAINT "requestorders_customer_type_id_fkey" FOREIGN KEY ("customer_type_id") REFERENCES "customer_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "requestorders" ADD CONSTRAINT "requestorders_operation_area_id_fkey" FOREIGN KEY ("operation_area_id") REFERENCES "operation_area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "requestorders" ADD CONSTRAINT "requestorders_company_farm_id_fkey" FOREIGN KEY ("company_farm_id") REFERENCES "company_farm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "requestorders" ADD CONSTRAINT "requestorders_ae_id_fkey" FOREIGN KEY ("ae_id") REFERENCES "ae_area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "requestorders" ADD CONSTRAINT "requestorders_evidence_fkey" FOREIGN KEY ("evidence") REFERENCES "attachment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
