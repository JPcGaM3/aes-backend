import { fromZonedTime, toDate } from "date-fns-tz";
import { PrismaClient } from "../../generated/prisma/index";

const prisma = new PrismaClient();

prisma.$use(async (params: any, next: any) => {
  const now = new Date();
  const bangkokTime = new Date(now.getTime() + 7 * 60 * 60 * 1000);

  if (
    params.model &&
    (params.action === "create" || params.action === "update")
  ) {
    if (params.action === "create") {
      params.args.data.created_at = bangkokTime;
      params.args.data.updated_at = bangkokTime;
    }

    if (params.action === "update") {
      params.args.data.updated_at = bangkokTime;
    }
  }

  return next(params);
});

export default prisma;
