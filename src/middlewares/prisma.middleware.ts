import { PrismaClient } from "../../generated/prisma/index";

import { DateTime } from "luxon";

const prisma = new PrismaClient();

prisma.$use(async (params: any, next: any) => {
  const bangkokTime = DateTime.now().setZone("Asia/Bangkok").toISO();

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
