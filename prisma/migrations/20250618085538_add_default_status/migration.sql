-- AlterTable
ALTER TABLE "bills" ALTER COLUMN "status_id" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "requestorders" ALTER COLUMN "status_id" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "taskorders" ALTER COLUMN "status_id" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "tools" ALTER COLUMN "status_id" SET DEFAULT 12;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "status_id" SET DEFAULT 12;
