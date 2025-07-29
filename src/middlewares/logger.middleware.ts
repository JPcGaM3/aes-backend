import { Request, Response, NextFunction } from "express";

export const requestLogger = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const start = Date.now();

	res.on("finish", () => {
		const duration = Date.now() - start;
		const now = new Date();
		const bangkokTime = new Date(now.getTime() + 7 * 60 * 60 * 1000);
		console.log(
			`[${bangkokTime.toISOString()}] ${req.method} ${req.originalUrl} → ${
				res.statusCode
			} (${duration}ms)`
		);
	});

	next();
};
