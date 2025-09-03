import { inArray } from "drizzle-orm";

import { db } from "../db";
import { quiz, quizAnswers } from "../db/schemas/quiz.schema";
import { formatResponse } from "../utils/response-formatter.util";
import { questions } from "../db/schemas/questions.schema";
import { BadRequestError } from "../utils/custom-errors.util";

import type { SubmitQuizAnswerResponse } from "../types/responses";
import type { SubmitQuizAnswerRequest } from "../types/requests";

export class QuizService {
	static async submitQuizAnswer(
		user_id: number | undefined,
		input: SubmitQuizAnswerRequest
	): Promise<SubmitQuizAnswerResponse> {
		return db.transaction(async (trx) => {
			if (!user_id) {
				throw new BadRequestError("User not found");
			}

			const unique_question_ids = [
				...new Set(input.quiz_answers.map((a) => a.question_id)),
			];
			// Fetch all questions and their answers in a single query
			const verified_questions = await trx
				.select({
					id: questions.id,
					answer: questions.answer,
				})
				.from(questions)
				.where(inArray(questions.id, unique_question_ids));

			const question_answer_map = new Map(
				verified_questions.map((q) => [q.id, q.answer])
			);

			let correct_answers_count = 0;
			let valid_questions_answered = 0;
			const quiz_answers_to_insert = [];

			for (const user_answer of input.quiz_answers) {
				const verified_question_answer = question_answer_map.get(
					user_answer.question_id
				);

				if (!verified_question_answer) {
					continue;
				}

				valid_questions_answered++;

				const isCorrect =
					verified_question_answer === user_answer.chosen_answer;

				if (isCorrect) {
					correct_answers_count++;
				}

				quiz_answers_to_insert.push({
					quiz_id: -1, // Temporary placeholder
					question_id: user_answer.question_id,
					chosen_answer: user_answer.chosen_answer,
					is_correct: isCorrect,
				});
			}

			if (valid_questions_answered === 0) {
				throw new BadRequestError("No valid questions were submitted");
			}

			const [quizResult] = await trx
				.insert(quiz)
				.values({
					user_id,
					score: correct_answers_count,
					time_taken_in_seconds: input.time_taken_in_seconds,
				})
				.returning()
				.execute();

			for (const answer of quiz_answers_to_insert) {
				answer.quiz_id = quizResult.id;
			}

			await trx
				.insert(quizAnswers)
				.values(quiz_answers_to_insert)
				.execute();

			return formatResponse({
				total_score: valid_questions_answered,
				correct_answers_count,
				time_taken_in_seconds: input.time_taken_in_seconds,
			});
		});
	}
}
