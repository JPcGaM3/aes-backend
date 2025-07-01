-- AlterTable
ALTER TABLE "requestorders" ADD COLUMN     "customer_operation_area_id" INTEGER;

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" SERIAL NOT NULL,
    "resource" TEXT,
    "action" "PermissionEnum",
    "description" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolePermission" (
    "id" SERIAL NOT NULL,
    "role_id" INTEGER,
    "permission_id" INTEGER,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "RolePermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "role_id" INTEGER,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Permission_resource_action_key" ON "Permission"("resource", "action");

-- CreateIndex
CREATE INDEX "RolePermission_role_id_idx" ON "RolePermission"("role_id");

-- CreateIndex
CREATE INDEX "RolePermission_permission_id_idx" ON "RolePermission"("permission_id");

-- CreateIndex
CREATE UNIQUE INDEX "RolePermission_role_id_permission_id_key" ON "RolePermission"("role_id", "permission_id");

-- CreateIndex
CREATE INDEX "UserRole_user_id_idx" ON "UserRole"("user_id");

-- CreateIndex
CREATE INDEX "UserRole_role_id_idx" ON "UserRole"("role_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_user_id_role_id_key" ON "UserRole"("user_id", "role_id");

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requestorders" ADD CONSTRAINT "requestorders_customer_operation_area_id_fkey" FOREIGN KEY ("customer_operation_area_id") REFERENCES "operation_area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
