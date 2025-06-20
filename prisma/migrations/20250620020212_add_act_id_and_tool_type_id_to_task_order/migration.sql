-- AlterTable
ALTER TABLE "requestorders" ADD COLUMN     "location_xy" TEXT,
ADD COLUMN     "supervisor_name" TEXT;

-- AlterTable
ALTER TABLE "taskorders" ADD COLUMN     "activity_id" INTEGER,
ADD COLUMN     "tool_type_id" INTEGER;

-- CreateIndex
CREATE INDEX "taskorders_activity_id_idx" ON "taskorders"("activity_id");

-- CreateIndex
CREATE INDEX "taskorders_tool_type_id_idx" ON "taskorders"("tool_type_id");

-- AddForeignKey
ALTER TABLE "taskorders" ADD CONSTRAINT "taskorders_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "activities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "taskorders" ADD CONSTRAINT "taskorders_tool_type_id_fkey" FOREIGN KEY ("tool_type_id") REFERENCES "tool_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
