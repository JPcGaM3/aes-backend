export class CustomError extends Error {
	statusCode: number;
	isOperational: boolean;

	constructor(
		message: string,
		statusCode: number,
		isOperational: boolean = true
	) {
		super(message);
		this.statusCode = statusCode;
		this.isOperational = isOperational;
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}

export class BadRequestError extends CustomError {
	constructor(message = "Bad Request") {
		super(message, 400);
	}
}

export class UnauthorizedError extends CustomError {
	constructor(message = "Unauthorized") {
		super(message, 401);
	}
}

export class ForbiddenError extends CustomError {
	constructor(message = "Forbidden") {
		super(message, 403);
	}
}

export class NotFoundError extends CustomError {
	constructor(message = "Resource Not Found") {
		super(message, 404);
	}
}

export class ConflictError extends CustomError {
	constructor(message = "Conflict") {
		super(message, 409);
	}
}

export class InternalServerError extends CustomError {
	constructor(message = "Internal Server Error", isOperational = false) {
		super(message, 500, isOperational);
	}
}
