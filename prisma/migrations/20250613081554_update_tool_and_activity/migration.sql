/*
  Warnings:

  - You are about to drop the column `activity_type_number` on the `tool_types` table. All the data in the column will be lost.
  - You are about to drop the column `tool_name` on the `tool_types` table. All the data in the column will be lost.
  - You are about to drop the column `tool_number` on the `tool_types` table. All the data in the column will be lost.
  - You are about to drop the column `tool_rank` on the `tool_types` table. All the data in the column will be lost.
  - You are about to drop the column `tool_number` on the `tools` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tool_types" DROP COLUMN "activity_type_number",
DROP COLUMN "tool_name",
DROP COLUMN "tool_number",
DROP COLUMN "tool_rank",
ADD COLUMN     "activity_id" INTEGER,
ADD COLUMN     "price_ct_fm" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "price_ct_rdc" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "price_ne1_fm" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "price_ne1_res" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "price_suffix" TEXT,
ADD COLUMN     "tool_type_name" TEXT,
ADD COLUMN     "tool_type_number" INTEGER;

-- AlterTable
ALTER TABLE "tools" DROP COLUMN "tool_number",
ADD COLUMN     "tool_type_number" INTEGER,
ALTER COLUMN "ae" DROP NOT NULL;
