import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../configs/constants";
import { checkObjectForInjection, sanitizeObject } from "../utils/functions";
import { formatResponse } from "../utils/response_formatter";

export const securityMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
): any => {
	try {
		const suspiciousField =
			checkObjectForInjection(req.body, "body.") ||
			checkObjectForInjection(req.query, "query.") ||
			checkObjectForInjection(req.params, "params.");

		if (suspiciousField) {
			console.warn(
				`[SECURITY] Potential SQL injection detected in ${suspiciousField}`,
				{
					ip: req.ip,
					userAgent: req.get("User-Agent"),
					url: req.originalUrl,
					method: req.method,
					timestamp: new Date().toISOString(),
				}
			);

			return res.status(HTTP_STATUS.BAD_REQUEST).json(
				formatResponse([], {
					message:
						"Invalid input detected. Request blocked for security reasons.",
				})
			);
		}

		req.body = sanitizeObject(req.body);
		(req as any).sanitizedQuery = sanitizeObject(req.query);
		(req as any).sanitizedParams = sanitizeObject(req.params);

		next();
	} catch (err) {
		console.error("[SECURITY] SecurityMiddleware error:", err);
		return res
			.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
			.json(formatResponse([], { message: "Security validation failed." }));
	}
};
