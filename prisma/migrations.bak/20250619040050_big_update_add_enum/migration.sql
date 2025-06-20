/*
  Warnings:

  - You are about to drop the column `status_id` on the `bills` table. All the data in the column will be lost.
  - You are about to drop the column `status_id` on the `requestorders` table. All the data in the column will be lost.
  - You are about to drop the column `status_id` on the `taskorders` table. All the data in the column will be lost.
  - You are about to drop the column `status_id` on the `tools` table. All the data in the column will be lost.
  - You are about to drop the column `role_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `status_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `status` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "StatusEnum" AS ENUM ('CREATED', 'PENDING_APPROVAL', 'PENDING_EDIT', 'PENDING', 'IN_PROGRESS', 'PENDING_REVIEW', 'PENDING_CONFIRM', 'COMPLETED', 'REJECTED', 'ON_HOLD', 'WORKING', 'INACTIVE', 'ON_LEAVE', 'CANCELLED');

-- CreateEnum
CREATE TYPE "RoleEnum" AS ENUM ('ADMIN', 'DEPARTMENT_HEAD', 'UNIT_HEAD', 'DRIVER', 'ACCOUNTANT', 'MAINTENANCE');

-- DropForeignKey
ALTER TABLE "bills" DROP CONSTRAINT "bills_status_id_fkey";

-- DropForeignKey
ALTER TABLE "requestorders" DROP CONSTRAINT "requestorders_status_id_fkey";

-- DropForeignKey
ALTER TABLE "taskorders" DROP CONSTRAINT "taskorders_status_id_fkey";

-- DropForeignKey
ALTER TABLE "tools" DROP CONSTRAINT "tools_status_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_role_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_status_id_fkey";

-- AlterTable
ALTER TABLE "bills" DROP COLUMN "status_id",
ADD COLUMN     "status" "StatusEnum" NOT NULL DEFAULT 'CREATED';

-- AlterTable
ALTER TABLE "requestorders" DROP COLUMN "status_id",
ADD COLUMN     "status" "StatusEnum" NOT NULL DEFAULT 'CREATED';

-- AlterTable
ALTER TABLE "taskorders" DROP COLUMN "status_id",
ADD COLUMN     "status" "StatusEnum" NOT NULL DEFAULT 'CREATED';

-- AlterTable
ALTER TABLE "tools" DROP COLUMN "status_id",
ADD COLUMN     "status" "StatusEnum" NOT NULL DEFAULT 'INACTIVE';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role_id",
DROP COLUMN "status_id",
ADD COLUMN     "role" "RoleEnum",
ADD COLUMN     "status" "StatusEnum" NOT NULL DEFAULT 'INACTIVE';

-- DropTable
DROP TABLE "roles";

-- DropTable
DROP TABLE "status";

-- CreateIndex
CREATE INDEX "cars_ae_id_idx" ON "cars"("ae_id");

-- CreateIndex
CREATE INDEX "company_farm_area_number_idx" ON "company_farm"("area_number");

-- CreateIndex
CREATE INDEX "operation_area_ae_id_idx" ON "operation_area"("ae_id");

-- CreateIndex
CREATE INDEX "operation_area_customer_type_id_idx" ON "operation_area"("customer_type_id");

-- CreateIndex
CREATE INDEX "requestorders_ae_id_idx" ON "requestorders"("ae_id");

-- CreateIndex
CREATE INDEX "requestorders_supervisor_id_idx" ON "requestorders"("supervisor_id");

-- CreateIndex
CREATE INDEX "requestorders_operation_area_id_idx" ON "requestorders"("operation_area_id");

-- CreateIndex
CREATE INDEX "requestorders_company_farm_id_idx" ON "requestorders"("company_farm_id");

-- CreateIndex
CREATE INDEX "requestorders_customer_type_id_idx" ON "requestorders"("customer_type_id");

-- CreateIndex
CREATE INDEX "taskorders_car_id_idx" ON "taskorders"("car_id");

-- CreateIndex
CREATE INDEX "taskorders_tool_id_idx" ON "taskorders"("tool_id");

-- CreateIndex
CREATE INDEX "taskorders_assigned_user_id_idx" ON "taskorders"("assigned_user_id");

-- CreateIndex
CREATE INDEX "taskorders_request_order_id_idx" ON "taskorders"("request_order_id");

-- CreateIndex
CREATE INDEX "tool_types_activity_id_idx" ON "tool_types"("activity_id");

-- CreateIndex
CREATE INDEX "tools_ae_id_idx" ON "tools"("ae_id");

-- CreateIndex
CREATE INDEX "tools_tool_type_id_idx" ON "tools"("tool_type_id");

-- CreateIndex
CREATE INDEX "users_ae_id_idx" ON "users"("ae_id");
