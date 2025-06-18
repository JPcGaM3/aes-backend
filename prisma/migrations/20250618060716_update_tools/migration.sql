/*
  Warnings:

  - You are about to drop the column `ae` on the `cars` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[asset]` on the table `tools` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `capitalized_on` to the `tools` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cars" DROP COLUMN "ae",
ADD COLUMN     "ae_id" INTEGER;

-- AlterTable
ALTER TABLE "tools" ADD COLUMN     "asset" VARCHAR(255),
ADD COLUMN     "capitalized_on" DATE NOT NULL,
ADD COLUMN     "year" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "tools_asset_key" ON "tools"("asset");

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_ae_id_fkey" FOREIGN KEY ("ae_id") REFERENCES "ae_area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
