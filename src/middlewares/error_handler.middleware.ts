import { Request, Response, NextFunction } from "express";
import { formatResponse } from "../utils/response_formatter";
import { CustomError, NotFoundError } from "../errors/custom_errors";
import { HTTP_STATUS } from "../configs/constants";

/**
 * Middleware for handling 404 Not Found routes.
 * This should be placed BEFORE the main error handler in your Express app.
 */
export const notFoundHandler = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  // Always call next() with an error to pass it to the centralized error handler
  next(
    new NotFoundError(`The requested URL ${_req.originalUrl} was not found.`)
  );
  // No explicit return needed here, next() will take care of it.
};

/**
 * Centralized error handling middleware.
 * This should be placed as the LAST middleware in your Express application.
 *
 * Express error handling middleware must have 4 arguments: (err, req, res, next)
 * It should not explicitly return a Response object.
 */
export const errorHandler = (
  err: Error, // TypeScript automatically infers `Error` here
  _req: Request,
  res: Response,
  _next: NextFunction // Required signature for Express error middleware
) => {
  let statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR;
  let message = "An unexpected server error occurred.";
  let code: string | undefined;
  let details: any;

  console.error("--- Application Error ---");
  console.error("Error Name:", err.name);
  console.error("Error Message:", err.message);
  console.error("Error Stack:", err.stack); // Important for debugging

  if (err instanceof CustomError) {
    statusCode = err.statusCode;
    message = err.message;

    // Map custom error types to specific client-facing codes if desired
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

    // For non-operational errors (e.g., programming bugs), use a generic message
    if (!err.isOperational) {
      message = "An unexpected server error occurred.";
      // Optionally, only reveal stack in development
      if (process.env.NODE_ENV === "development") {
        details = { stack: err.stack };
      }
    }
  } else if (err instanceof Error) {
    // For standard Error instances (not custom errors)
    statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR;
    message = "An unexpected server error occurred.";
    if (process.env.NODE_ENV === "development") {
      details = { originalMessage: err.message, stack: err.stack };
    }
  }
  // No else-if needed for non-Error types, as we want to default to generic 500 for them.

  // Send the formatted error response
  // IMPORTANT: DO NOT 'return' the result of res.json() directly.
  // Express middleware is designed to have a void return.
  res.status(statusCode).json(
    formatResponse(null, {
      isError: true,
      message: message,
      ...(code && { code }),
      ...(details && { details }),
    })
  );
  // After sending the response, the function implicitly returns void.
};
