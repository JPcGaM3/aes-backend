-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "unit" INTEGER,
    "ae" VARCHAR(255) NOT NULL,
    "role" VARCHAR(255) NOT NULL,
    "status_id" INTEGER,
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
    "car_number" VARCHAR(255) NOT NULL,
    "asset" VARCHAR(255) NOT NULL,
    "asset_description" TEXT,
    "capitalized_on" DATE NOT NULL,
    "cost_center" VARCHAR(255) NOT NULL,
    "hp" DOUBLE PRECISION NOT NULL,
    "acquis_val" INTEGER NOT NULL,
    "curr_val" INTEGER NOT NULL,
    "ae" VARCHAR(255) NOT NULL,
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
CREATE TABLE "requestorders" (
    "id" SERIAL NOT NULL,
    "customer_type" VARCHAR(255) NOT NULL,
    "affiliation" VARCHAR(10) NOT NULL,
    "quota_number" VARCHAR(255),
    "farm_name" VARCHAR(255),
    "land_number" INTEGER,
    "activity_describe" TEXT NOT NULL,
    "tool_describe" TEXT NOT NULL,
    "ap_month_year" VARCHAR(255) NOT NULL,
    "supervisor_fullname" VARCHAR(255),
    "unit" INTEGER NOT NULL,
    "zone" INTEGER NOT NULL,
    "ae" VARCHAR(255) NOT NULL,
    "target_area" INTEGER DEFAULT 0,
    "actual_area" INTEGER DEFAULT 0,
    "on_live" BOOLEAN NOT NULL,
    "evidence" TEXT,
    "sale" DOUBLE PRECISION,
    "status_id" INTEGER,
    "supervisor_id" INTEGER,
    "location_id" INTEGER,
    "created_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "updated_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,
    "unit_head_id" INTEGER,
    "work_order_number" VARCHAR(255),
    "attachmentId" INTEGER,

    CONSTRAINT "requestorders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "taskorders" (
    "id" SERIAL NOT NULL,
    "area_number" VARCHAR(255) NOT NULL,
    "area_target" INTEGER DEFAULT 0,
    "area_actual" INTEGER DEFAULT 0,
    "price" DOUBLE PRECISION DEFAULT 0,
    "comment" TEXT,
    "ap_date" DATE NOT NULL,
    "oil_slip" TEXT,
    "oil_start_mile" INTEGER,
    "start_mile" INTEGER,
    "end_mile" INTEGER,
    "oil_start" DOUBLE PRECISION,
    "oil_end" DOUBLE PRECISION,
    "car_start_hour" VARCHAR(255) NOT NULL,
    "car_end_hour" VARCHAR(255) NOT NULL,
    "start_timer" VARCHAR(255) NOT NULL,
    "end_timer" VARCHAR(255) NOT NULL,
    "status_id" INTEGER,
    "request_order_id" INTEGER,
    "car_id" INTEGER,
    "tool_id" INTEGER,
    "assigned_user_id" INTEGER,
    "created_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "updated_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "taskorders_pkey" PRIMARY KEY ("id")
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
    "ae" VARCHAR(255),
    "status_id" INTEGER,
    "created_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "updated_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,
    "ae_id" INTEGER,
    "ae_number" INTEGER,
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
CREATE TABLE "status" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "updated_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bills" (
    "id" SERIAL NOT NULL,
    "target_price" DOUBLE PRECISION DEFAULT 0,
    "actual_price" DOUBLE PRECISION DEFAULT 0,
    "status_id" INTEGER,
    "request_order_id" INTEGER,
    "created_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "updated_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "bills_pkey" PRIMARY KEY ("id")
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

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "cars_asset_key" ON "cars"("asset");

-- CreateIndex
CREATE UNIQUE INDEX "operation_area_area_number_key" ON "operation_area"("area_number");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "requestorders" ADD CONSTRAINT "requestorders_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "requestorders" ADD CONSTRAINT "requestorders_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "requestorders" ADD CONSTRAINT "requestorders_supervisor_id_fkey" FOREIGN KEY ("supervisor_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "requestorders" ADD CONSTRAINT "requestorders_attachmentId_fkey" FOREIGN KEY ("attachmentId") REFERENCES "attachment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taskorders" ADD CONSTRAINT "taskorders_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "taskorders" ADD CONSTRAINT "taskorders_assigned_user_id_fkey" FOREIGN KEY ("assigned_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "taskorders" ADD CONSTRAINT "taskorders_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "taskorders" ADD CONSTRAINT "taskorders_request_order_id_fkey" FOREIGN KEY ("request_order_id") REFERENCES "requestorders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "taskorders" ADD CONSTRAINT "taskorders_tool_id_fkey" FOREIGN KEY ("tool_id") REFERENCES "tools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tool_types" ADD CONSTRAINT "tool_types_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "activities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tools" ADD CONSTRAINT "tools_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tools" ADD CONSTRAINT "tools_ae_number_fkey" FOREIGN KEY ("ae_number") REFERENCES "ae_area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tools" ADD CONSTRAINT "tools_tool_type_id_fkey" FOREIGN KEY ("tool_type_id") REFERENCES "tool_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "company_farm" ADD CONSTRAINT "company_farm_area_number_fkey" FOREIGN KEY ("area_number") REFERENCES "operation_area"("area_number") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "operation_area" ADD CONSTRAINT "operation_area_ae_id_fkey" FOREIGN KEY ("ae_id") REFERENCES "ae_area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "operation_area" ADD CONSTRAINT "operation_area_customer_type_id_fkey" FOREIGN KEY ("customer_type_id") REFERENCES "customer_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bills" ADD CONSTRAINT "bills_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bills" ADD CONSTRAINT "bills_request_order_id_fkey" FOREIGN KEY ("request_order_id") REFERENCES "requestorders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
