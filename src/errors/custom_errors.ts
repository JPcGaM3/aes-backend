// Base custom error class for consistent structure
export class CustomError extends Error {
	statusCode: number;
	isOperational: boolean; // Indicates if this is a known, expected error (e.g., bad input)

	constructor(
		message: string,
		statusCode: number,
		isOperational: boolean = true
	) {
		super(message);
		this.statusCode = statusCode;
		this.isOperational = isOperational;
		this.name = this.constructor.name; // Set the name to the class name (e.g., 'BadRequestError')
		Error.captureStackTrace(this, this.constructor); // Captures stack trace
	}
}

// Common HTTP-specific errors
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

// For errors that indicate a server-side problem not directly related to user input
export class InternalServerError extends CustomError {
	constructor(message = "Internal Server Error", isOperational = false) {
		super(message, 500, isOperational);
	}
}
