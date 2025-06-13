-- CreateTable
CREATE TABLE "activities" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "updated_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bills" (
    "id" SERIAL NOT NULL,
    "target_price" DOUBLE PRECISION DEFAULT 0,
    "actual_price" DOUBLE PRECISION DEFAULT 0,
    "status" VARCHAR(255),
    "request_order_id" INTEGER,
    "created_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "updated_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "bills_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "prices" (
    "id" SERIAL NOT NULL,
    "rate_unit" VARCHAR(255) NOT NULL,
    "ct_inner_price" DOUBLE PRECISION NOT NULL,
    "ct_outer_price" DOUBLE PRECISION NOT NULL,
    "ne1_inner_price" DOUBLE PRECISION NOT NULL,
    "ne1_outer_price" DOUBLE PRECISION NOT NULL,
    "ne2_inner_price" DOUBLE PRECISION NOT NULL,
    "ne2_outer_price" DOUBLE PRECISION NOT NULL,
    "activity_id" INTEGER NOT NULL,
    "tool_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "updated_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "prices_pkey" PRIMARY KEY ("id")
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
    "status" VARCHAR(255),
    "supervisor_id" INTEGER,
    "location_id" INTEGER,
    "created_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "updated_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,

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
    "status" VARCHAR(255),
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
CREATE TABLE "tools" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "activity_type" VARCHAR(255),
    "rank" INTEGER NOT NULL,
    "ae" VARCHAR(255) NOT NULL,
    "status" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "updated_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "tools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "quota_number" VARCHAR(255),
    "fullname" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "unit" INTEGER NOT NULL,
    "zone" VARCHAR(255) NOT NULL,
    "ae" VARCHAR(255) NOT NULL,
    "role" VARCHAR(255) NOT NULL,
    "leader_id" INTEGER,
    "status" VARCHAR(255),
    "active" BOOLEAN NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "updated_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,
    "username" TEXT,
    "password" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_farm" (
    "id" BIGSERIAL NOT NULL,
    "area_number" BIGINT NOT NULL,
    "zone" VARCHAR,
    "farm_name" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "updated_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "company_farm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "operation_area" (
    "id" BIGSERIAL NOT NULL,
    "operation_area" TEXT,
    "customer_type" TEXT,
    "area_number" BIGINT,
    "created_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "updated_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'Asia/Bangkok'::text),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "operation_area_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cars_asset_key" ON "cars"("asset");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_password_key" ON "users"("password");

-- CreateIndex
CREATE UNIQUE INDEX "operation_area_id_key" ON "operation_area"("id");

-- CreateIndex
CREATE UNIQUE INDEX "operation_area_area_number_key" ON "operation_area"("area_number");

-- AddForeignKey
ALTER TABLE "bills" ADD CONSTRAINT "bills_request_order_id_fkey" FOREIGN KEY ("request_order_id") REFERENCES "requestorders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "prices" ADD CONSTRAINT "prices_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "activities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "prices" ADD CONSTRAINT "prices_tool_id_fkey" FOREIGN KEY ("tool_id") REFERENCES "tools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "requestorders" ADD CONSTRAINT "requestorders_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "requestorders" ADD CONSTRAINT "requestorders_supervisor_id_fkey" FOREIGN KEY ("supervisor_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "taskorders" ADD CONSTRAINT "taskorders_assigned_user_id_fkey" FOREIGN KEY ("assigned_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "taskorders" ADD CONSTRAINT "taskorders_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "taskorders" ADD CONSTRAINT "taskorders_request_order_id_fkey" FOREIGN KEY ("request_order_id") REFERENCES "requestorders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "taskorders" ADD CONSTRAINT "taskorders_tool_id_fkey" FOREIGN KEY ("tool_id") REFERENCES "tools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_leader_id_fkey" FOREIGN KEY ("leader_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "company_farm" ADD CONSTRAINT "company_farm_area_number_fkey" FOREIGN KEY ("area_number") REFERENCES "operation_area"("area_number") ON DELETE SET NULL ON UPDATE CASCADE;
