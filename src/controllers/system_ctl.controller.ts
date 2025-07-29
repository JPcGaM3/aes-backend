import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../configs/constants";
import { formatResponse } from "../utils/response_formatter";
import { clearPermissionsCache } from "../middlewares/rbac.middleware";

export const SystemController = {
	clearCache: async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<any> => {
		try {
			clearPermissionsCache();
			return res
				.status(HTTP_STATUS.OK)
				.json(formatResponse([], { message: "Permissions cache cleared" }));
		} catch (error) {
			next(error);
		}
	},
};
