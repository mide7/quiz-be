import { PaginationResult, Result } from "../types/responses";

export function formatResponse<T>(data: T, message?: string): Result<T> {
	return {
		data,
		message: message || "Success",
	};
}

export function formatPaginationResponse<T>(
	data: T,
	pagination: PaginationResult<T>["pagination"],
	message?: string
): PaginationResult<T> {
	return {
		data,
		pagination,
		message: message || "Success",
	};
}
