interface SuccessResponse<T> {
	success: true;
	message: string | null;
	length?: number;
	data: T;
}

interface ErrorResponse {
	success: false;
	message: string;
	code?: string;
	details?: any;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

/**
 * Formats API responses consistently.
 * @template T - The type of the data being returned in a success response.
 * @param {T | null} data - The data to be returned. Null for error responses.
 * @param {Object} options - Additional options for the response.
 * @param {string} [options.message] - An optional message for success or a required message for error.
 * @param {boolean} [options.isError] - Flag to indicate if this is an error response.
 * @param {string} [options.code] - Optional error code for error responses.
 * @param {any} [options.details] - Optional additional error details for error responses.
 * @returns {ApiResponse<T>} A formatted response object.
 */
export const formatResponse = <T>(
	data: T | null,
	options: {
		message?: string;
		isError?: boolean;
		code?: string;
		details?: any;
	} = {}
): ApiResponse<T> => {
	const { message, isError = false, code, details } = options;

	if (isError) {
		if (!message) {
			throw new Error("Error responses must have a message.");
		}
		return {
			success: false,
			message: message,
			...(code && { code }),
			...(details && { details }),
		};
	} else {
		const hasData: boolean = Array.isArray(data) ? data.length > 0 : !!data;
		const responseMessage = message || (hasData ? "Success" : "No data found");

		const successRes: SuccessResponse<T> = {
			success: true,
			message: responseMessage,
			data: data as T,
		};

		if (Array.isArray(data)) {
			successRes.length = data.length;
		}

		return successRes;
	}
};
