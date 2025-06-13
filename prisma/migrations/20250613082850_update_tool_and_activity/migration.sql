-- AddForeignKey
ALTER TABLE "tool_types" ADD CONSTRAINT "tool_types_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "activities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
