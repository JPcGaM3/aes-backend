-- CreateEnum
CREATE TYPE "StatusEnum" AS ENUM ('CREATED', 'PENDING_APPROVAL', 'PENDING_EDIT', 'PENDING', 'IN_PROGRESS', 'PENDING_REVIEW', 'PENDING_CONFIRM', 'COMPLETED', 'REJECTED', 'ON_HOLD', 'WORKING', 'INACTIVE', 'ON_LEAVE', 'CANCELLED');

-- CreateEnum
CREATE TYPE "RoleEnum" AS ENUM ('ADMIN', 'DEPARTMENT_HEAD', 'UNIT_HEAD', 'DRIVER', 'ACCOUNTANT', 'MAINTENANCE');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "phone" VARCHAR(15),
    "unit" INTEGER,
    "ae_id" INTEGER,
    "role" "RoleEnum"[],
    "status" "StatusEnum" NOT NULL DEFAULT 'INACTIVE',
    "active" BOOLEAN NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "updated_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,
    "username" VARCHAR(255),
    "email" VARCHAR(255),
    "fullname" VARCHAR(255),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cars" (
    "id" SERIAL NOT NULL,
    "car_number" VARCHAR(255),
    "asset" VARCHAR(255),
    "asset_class" INTEGER,
    "asset_description" TEXT,
    "name" TEXT,
    "year" INTEGER,
    "capitalized_on" DATE,
    "service_life" INTEGER,
    "cost_center" VARCHAR(255),
    "note" TEXT,
    "hp" DOUBLE PRECISION,
    "acquis_val" DOUBLE PRECISION,
    "accum_dep" DOUBLE PRECISION,
    "curr_bk_val" DOUBLE PRECISION,
    "active" BOOLEAN,
    "ae_id" INTEGER,
    "created_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "updated_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "id" SERIAL NOT NULL,
    "location_name" VARCHAR(255),
    "land_number" INTEGER,
    "location_xy" TEXT NOT NULL,
    "is_new_location" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "updated_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activities" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "updated_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,
    "activity_number" INTEGER NOT NULL,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tool_types" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "updated_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,
    "activity_id" INTEGER NOT NULL,
    "price_ct_fm" DOUBLE PRECISION DEFAULT 0,
    "price_ct_rdc" DOUBLE PRECISION DEFAULT 0,
    "price_ne1_fm" DOUBLE PRECISION DEFAULT 0,
    "price_ne1_res" DOUBLE PRECISION DEFAULT 0,
    "price_suffix" TEXT,
    "tool_type_name" TEXT NOT NULL,
    "tool_type_number" INTEGER,

    CONSTRAINT "tool_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tools" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "asset" VARCHAR(255),
    "year" INTEGER,
    "capitalized_on" DATE NOT NULL,
    "status" "StatusEnum" NOT NULL DEFAULT 'INACTIVE',
    "created_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "updated_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,
    "ae_id" INTEGER,
    "tool_type_id" INTEGER,

    CONSTRAINT "tools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ae_area" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "updated_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "ae_area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "operation_area" (
    "id" SERIAL NOT NULL,
    "operation_area" VARCHAR(255),
    "area_number" INTEGER,
    "created_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "updated_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,
    "ae_id" INTEGER,
    "customer_type_id" INTEGER NOT NULL,

    CONSTRAINT "operation_area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_farm" (
    "id" SERIAL NOT NULL,
    "area_number" INTEGER NOT NULL,
    "zone" VARCHAR(255),
    "farm_name" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "updated_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "company_farm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "updated_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "customer_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attachment" (
    "id" SERIAL NOT NULL,
    "file_name" VARCHAR(255),
    "file_path" VARCHAR(255),
    "file_type" VARCHAR(255),
    "file_data" BYTEA,
    "created_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "updated_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "requestorders" (
    "id" SERIAL NOT NULL,
    "work_order_number" VARCHAR(255),
    "phone" VARCHAR(15),
    "customer_type_id" INTEGER,
    "operation_area_id" INTEGER,
    "quota_number" VARCHAR(255),
    "company_farm_id" INTEGER,
    "zone" VARCHAR(255),
    "farmer_name" VARCHAR(255),
    "land_number" INTEGER,
    "ap_month" VARCHAR(255),
    "ap_year" INTEGER,
    "ae_id" INTEGER,
    "target_area" DOUBLE PRECISION DEFAULT 0,
    "actual_area" DOUBLE PRECISION DEFAULT 0,
    "active" BOOLEAN DEFAULT true,
    "evidence" INTEGER,
    "sale" DOUBLE PRECISION,
    "status" "StatusEnum" NOT NULL DEFAULT 'CREATED',
    "supervisor_name" TEXT,
    "supervisor_id" INTEGER,
    "location_xy" TEXT,
    "location_id" INTEGER,
    "unit_head_id" INTEGER,
    "comment" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "updated_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "requestorders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "taskorders" (
    "id" SERIAL NOT NULL,
    "request_order_id" INTEGER,
    "activities_id" INTEGER,
    "tool_types_id" INTEGER,
    "car_id" INTEGER,
    "tool_id" INTEGER,
    "assigned_user_id" INTEGER,
    "target_area" DOUBLE PRECISION DEFAULT 0,
    "actual_area" DOUBLE PRECISION DEFAULT 0,
    "price" DOUBLE PRECISION DEFAULT 0,
    "ap_date" DATE,
    "oil_slip" TEXT,
    "oil_start_mile" INTEGER,
    "start_mile" INTEGER,
    "end_mile" INTEGER,
    "oil_start" DOUBLE PRECISION,
    "oil_end" DOUBLE PRECISION,
    "car_start_hour" VARCHAR(255),
    "car_end_hour" VARCHAR(255),
    "start_timer" VARCHAR(255),
    "end_timer" VARCHAR(255),
    "status" "StatusEnum" NOT NULL DEFAULT 'CREATED',
    "comment" TEXT,
    "active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "updated_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "taskorders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bills" (
    "id" SERIAL NOT NULL,
    "target_price" DOUBLE PRECISION DEFAULT 0,
    "actual_price" DOUBLE PRECISION DEFAULT 0,
    "status" "StatusEnum" NOT NULL DEFAULT 'CREATED',
    "request_order_id" INTEGER,
    "created_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "updated_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "bills_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_ae_id_idx" ON "users"("ae_id");

-- CreateIndex
CREATE INDEX "cars_ae_id_idx" ON "cars"("ae_id");

-- CreateIndex
CREATE INDEX "tool_types_activity_id_idx" ON "tool_types"("activity_id");

-- CreateIndex
CREATE UNIQUE INDEX "tools_asset_key" ON "tools"("asset");

-- CreateIndex
CREATE INDEX "tools_ae_id_idx" ON "tools"("ae_id");

-- CreateIndex
CREATE INDEX "tools_tool_type_id_idx" ON "tools"("tool_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "operation_area_area_number_key" ON "operation_area"("area_number");

-- CreateIndex
CREATE INDEX "operation_area_ae_id_idx" ON "operation_area"("ae_id");

-- CreateIndex
CREATE INDEX "operation_area_customer_type_id_idx" ON "operation_area"("customer_type_id");

-- CreateIndex
CREATE INDEX "company_farm_area_number_idx" ON "company_farm"("area_number");

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
CREATE INDEX "taskorders_activities_id_idx" ON "taskorders"("activities_id");

-- CreateIndex
CREATE INDEX "taskorders_tool_types_id_idx" ON "taskorders"("tool_types_id");

-- CreateIndex
CREATE INDEX "taskorders_car_id_idx" ON "taskorders"("car_id");

-- CreateIndex
CREATE INDEX "taskorders_tool_id_idx" ON "taskorders"("tool_id");

-- CreateIndex
CREATE INDEX "taskorders_assigned_user_id_idx" ON "taskorders"("assigned_user_id");

-- CreateIndex
CREATE INDEX "taskorders_request_order_id_idx" ON "taskorders"("request_order_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_ae_id_fkey" FOREIGN KEY ("ae_id") REFERENCES "ae_area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_ae_id_fkey" FOREIGN KEY ("ae_id") REFERENCES "ae_area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tool_types" ADD CONSTRAINT "tool_types_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "activities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tools" ADD CONSTRAINT "tools_ae_id_fkey" FOREIGN KEY ("ae_id") REFERENCES "ae_area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tools" ADD CONSTRAINT "tools_tool_type_id_fkey" FOREIGN KEY ("tool_type_id") REFERENCES "tool_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "operation_area" ADD CONSTRAINT "operation_area_ae_id_fkey" FOREIGN KEY ("ae_id") REFERENCES "ae_area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "operation_area" ADD CONSTRAINT "operation_area_customer_type_id_fkey" FOREIGN KEY ("customer_type_id") REFERENCES "customer_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "company_farm" ADD CONSTRAINT "company_farm_area_number_fkey" FOREIGN KEY ("area_number") REFERENCES "operation_area"("area_number") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requestorders" ADD CONSTRAINT "requestorders_customer_type_id_fkey" FOREIGN KEY ("customer_type_id") REFERENCES "customer_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "requestorders" ADD CONSTRAINT "requestorders_operation_area_id_fkey" FOREIGN KEY ("operation_area_id") REFERENCES "operation_area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "requestorders" ADD CONSTRAINT "requestorders_company_farm_id_fkey" FOREIGN KEY ("company_farm_id") REFERENCES "company_farm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "requestorders" ADD CONSTRAINT "requestorders_ae_id_fkey" FOREIGN KEY ("ae_id") REFERENCES "ae_area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "requestorders" ADD CONSTRAINT "requestorders_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "requestorders" ADD CONSTRAINT "requestorders_supervisor_id_fkey" FOREIGN KEY ("supervisor_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "requestorders" ADD CONSTRAINT "requestorders_evidence_fkey" FOREIGN KEY ("evidence") REFERENCES "attachment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "taskorders" ADD CONSTRAINT "taskorders_assigned_user_id_fkey" FOREIGN KEY ("assigned_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "taskorders" ADD CONSTRAINT "taskorders_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "taskorders" ADD CONSTRAINT "taskorders_request_order_id_fkey" FOREIGN KEY ("request_order_id") REFERENCES "requestorders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "taskorders" ADD CONSTRAINT "taskorders_activities_id_fkey" FOREIGN KEY ("activities_id") REFERENCES "activities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "taskorders" ADD CONSTRAINT "taskorders_tool_id_fkey" FOREIGN KEY ("tool_id") REFERENCES "tools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "taskorders" ADD CONSTRAINT "taskorders_tool_types_id_fkey" FOREIGN KEY ("tool_types_id") REFERENCES "tool_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bills" ADD CONSTRAINT "bills_request_order_id_fkey" FOREIGN KEY ("request_order_id") REFERENCES "requestorders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
