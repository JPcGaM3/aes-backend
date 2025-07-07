import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "./constants";

export const Page_Not_Found = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.status(HTTP_STATUS.NOT_FOUND).json({ error: "Resource not found" });
};

export const Page_Internal_Error = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.error(err.stack);
	res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
		error: "Something went wrong!",
	});
};
