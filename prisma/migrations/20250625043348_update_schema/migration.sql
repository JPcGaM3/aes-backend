-- DropForeignKey
ALTER TABLE "requestorders" DROP CONSTRAINT "requestorders_supervisor_id_fkey";

-- AddForeignKey
ALTER TABLE "requestorders" ADD CONSTRAINT "requestorders_unit_head_id_fkey" FOREIGN KEY ("unit_head_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
