import type { Question, User } from "../db/types";

export interface PaginationResult<T> {
	message: string;
	data: T;
	pagination: {
		// Offset-based
		page: number;
		limit: number;
		total: number;
		totalPages: number;
		hasNextPage: boolean;
		hasPreviousPage: boolean;

		// Cursor-based
		nextCursor?: number;
		prevCursor?: number;
	};
}

export interface Result<T> {
	message: string;
	data: T;
}

export interface ErrorResponse {
	message: string;
}

export type AuthResponse = Result<{
	token: string;
	user: Pick<User, "id" | "email" | "username">;
}>;

export type CreateQuestionResponse = Result<Question>;
export type EditQuestionResponse = Result<Question>;
export type DeleteQuestionResponse = Result<Question>;
export type GetQuestionsResponse = PaginationResult<Omit<Question, "answer">[]>;

export type SubmitQuizAnswerResponse = Result<{
	total_score: number;
	correct_answers_count: number;
	time_taken_in_seconds: number;
}>;
