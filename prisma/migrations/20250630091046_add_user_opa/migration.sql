-- CreateEnum
CREATE TYPE "PermissionEnum" AS ENUM ('CREATE', 'READ', 'UPDATE', 'DELETE');

-- CreateTable
CREATE TABLE "user_operation_area" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "operation_area_id" INTEGER,
    "active" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "user_operation_area_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_operation_area" ADD CONSTRAINT "user_operation_area_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_operation_area" ADD CONSTRAINT "user_operation_area_operation_area_id_fkey" FOREIGN KEY ("operation_area_id") REFERENCES "operation_area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
