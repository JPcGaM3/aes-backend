-- AlterTable
ALTER TABLE "cars" ALTER COLUMN "active" SET DEFAULT true;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "active" DROP NOT NULL,
ALTER COLUMN "active" SET DEFAULT true;
