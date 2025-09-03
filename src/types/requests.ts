export type RegisterRequest = {
	username: string;
	email: string;
	password: string;
};

export type LoginRequest = {
	email: string;
	password: string;
};

export type CreateQuestionRequest = {
	text: string;
	options: string[];
	answer: string;
};

export interface EditQuestionRequest extends CreateQuestionRequest {}

export type DeleteQuestionRequest = { id: number };

export type GetQuestionsRequest = Partial<{
	page: number;
	limit: number;

	// Cursor-based pagination (alternative)
	cursor: number; // This would be the ID or timestamp of last item
	take: number;

	// Filters
	search: string;
	fetch_all: boolean;
}>;

export type SubmitQuizAnswerRequest = {
	quiz_answers: {
		question_id: number;
		chosen_answer: string;
	}[];
	time_taken_in_seconds: number;
};
