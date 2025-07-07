import { PrismaClient } from "../../generated/prisma/index";

import { DateTime } from "luxon";

const prisma = new PrismaClient();

prisma.$use(async (params: any, next: any) => {
	const utcTime = DateTime.now().setZone("UTC").toISO();

	if (
		params.model &&
		(params.action === "create" || params.action === "update")
	) {
		if (params.action === "create") {
			params.args.data.created_at = utcTime;
			params.args.data.updated_at = utcTime;
		}

		if (params.action === "update") {
			params.args.data.updated_at = utcTime;
		}
	}

	return next(params);
});

export default prisma;
