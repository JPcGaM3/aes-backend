/*
  Warnings:

  - You are about to drop the column `leader_id` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_leader_id_fkey";

-- AlterTable
ALTER TABLE "operation_area" ADD COLUMN     "ae_number" BIGINT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "leader_id";

-- CreateTable
CREATE TABLE "ae_area" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "updated_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "ae_area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_type" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "updated_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "customer_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "status" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "updated_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "status_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "status_id_key" ON "status"("id");

-- AddForeignKey
ALTER TABLE "operation_area" ADD CONSTRAINT "operation_area_ae_number_fkey" FOREIGN KEY ("ae_number") REFERENCES "ae_area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
