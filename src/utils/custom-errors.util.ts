import { StatusCodes } from "http-status-codes";

export class HttpError extends Error {
	public status: number;

	constructor(
		message: string,
		status: number = StatusCodes.INTERNAL_SERVER_ERROR
	) {
		super(message);
		this.status = status;
		// This line is for ensuring the class name appears in the stack trace
		Object.setPrototypeOf(this, HttpError.prototype);
	}
}

export class NotFoundError extends HttpError {
	constructor(message: string = "Not Found") {
		super(message, StatusCodes.NOT_FOUND);
	}
}

export class InternalServerError extends HttpError {
	constructor(message: string = "Internal Server Error") {
		super(message, StatusCodes.INTERNAL_SERVER_ERROR);
	}
}

export class BadRequestError extends HttpError {
	constructor(message: string = "Bad Request") {
		super(message, StatusCodes.BAD_REQUEST);
	}
}

export class UnauthorizedError extends HttpError {
	constructor(message: string = "Unauthorized") {
		super(message, StatusCodes.UNAUTHORIZED);
	}
}

export class UnprocessableEntityError extends HttpError {
	constructor(message: string = "Unprocessable Entity") {
		super(message, StatusCodes.UNPROCESSABLE_ENTITY);
	}
}
