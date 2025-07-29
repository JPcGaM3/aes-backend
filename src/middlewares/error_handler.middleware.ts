import { Request, Response, NextFunction } from "express";
import { formatResponse } from "../utils/response_formatter";
import { CustomError, NotFoundError } from "../errors/custom_errors";
import { HTTP_STATUS } from "../configs/constants";

export const notFoundHandler = (
	_req: Request,
	_res: Response,
	next: NextFunction
) => {
	next(
		new NotFoundError(`The requested URL ${_req.originalUrl} was not found.`)
	);
};

export const errorHandler = (
	err: Error,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	let statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR;
	let message = "An unexpected server error occurred.";
	let code: string | undefined;
	let details: any;

	console.error("--- Application Error ---");
	console.error("Error Name:", err.name);
	console.error("Error Message:", err.message);
	console.error("Error Stack:", err.stack);

	if (err instanceof CustomError) {
		statusCode = err.statusCode;
		message = err.message;

		if (err.name === "BadRequestError") {
			code = "BAD_REQUEST";
		} else if (err.name === "NotFoundError") {
			code = "NOT_FOUND";
		} else if (err.name === "UnauthorizedError") {
			code = "UNAUTHORIZED";
		} else if (err.name === "ForbiddenError") {
			code = "FORBIDDEN";
		} else if (err.name === "ConflictError") {
			code = "CONFLICT";
		}

		if (!err.isOperational) {
			message = "An unexpected server error occurred.";
			if (process.env.NODE_ENV === "DEVELOPMENT") {
				details = { stack: err.stack };
			}
		}
	} else if (err instanceof Error) {
		statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR;
		message = "An unexpected server error occurred.";
		if (process.env.NODE_ENV === "DEVELOPMENT") {
			details = { originalMessage: err.message, stack: err.stack };
		}
	}

	res.status(statusCode).json(
		formatResponse(null, {
			isError: true,
			message: message,
			...(code && { code }),
			...(details && { details }),
		})
	);
};
