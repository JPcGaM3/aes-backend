-- CreateTable
CREATE TABLE "user_ae_area" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "ae_area_id" INTEGER,
    "active" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "user_ae_area_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_ae_area_user_id_idx" ON "user_ae_area"("user_id");

-- CreateIndex
CREATE INDEX "user_ae_area_ae_area_id_idx" ON "user_ae_area"("ae_area_id");

-- AddForeignKey
ALTER TABLE "user_ae_area" ADD CONSTRAINT "user_ae_area_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_ae_area" ADD CONSTRAINT "user_ae_area_ae_area_id_fkey" FOREIGN KEY ("ae_area_id") REFERENCES "ae_area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
