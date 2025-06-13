/*
  Warnings:

  - You are about to drop the column `activity_type` on the `tools` table. All the data in the column will be lost.
  - You are about to drop the column `rank` on the `tools` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "activities" ADD COLUMN     "activity_number" INTEGER;

-- AlterTable
ALTER TABLE "tools" DROP COLUMN "activity_type",
DROP COLUMN "rank",
ADD COLUMN     "tool_number" INTEGER;

-- CreateTable
CREATE TABLE "tool_types" (
    "id" SERIAL NOT NULL,
    "tool_name" TEXT,
    "activity_type_number" INTEGER,
    "tool_number" INTEGER,
    "tool_rank" INTEGER,
    "created_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "updated_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "tool_types_pkey" PRIMARY KEY ("id")
);
