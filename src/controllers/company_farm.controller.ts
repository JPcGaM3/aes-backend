import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../configs/constants";
import { formatResponse } from "../utils/response_formatter";
import { CompanyFarmService } from "../services/company_farm.service";

export const CompanyFarmController = {
	getByAreaNumber: async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<any> => {
		const { areaNumber } = req.query;
		try {
			if (!areaNumber) {
				return res.status(HTTP_STATUS.BAD_REQUEST).json(
					formatResponse([], {
						message: "Operation area is required.",
					})
				);
			}
			const companyFarms = await CompanyFarmService.getByAreaNumber(
				Number(areaNumber)
			);
			return res.status(HTTP_STATUS.OK).json(formatResponse(companyFarms));
		} catch (error) {
			next(error);
		}
	},
};
