import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { users } from "../../generated/prisma";
import { HTTP_STATUS } from "../configs/constants";
import { formatResponse } from "../utils/response_formatter";

export const AuthMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
): any => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res
			.status(HTTP_STATUS.UNAUTHORIZED)
			.json(formatResponse([], { message: "Unauthorized" }));
	}

	const token = authHeader.split(" ")[1];

	try {
		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET as string
		) as users & {
			token: string;
		};
		req.currentUser = decoded;
		next();
	} catch (err) {
		return res
			.status(HTTP_STATUS.UNAUTHORIZED)
			.json(formatResponse([], { message: "Invalid or expired token" }));
	}
};
