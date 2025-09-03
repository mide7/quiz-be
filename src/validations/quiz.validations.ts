import Joi from "joi";
import { SubmitQuizAnswerRequest } from "../types/requests";

export const submitQuizAnswerSchema = Joi.object<SubmitQuizAnswerRequest>({
	quiz_answers: Joi.array()
		.items(
			Joi.object({
				question_id: Joi.number().required(),
				chosen_answer: Joi.string().required(),
			})
		)
		.min(1)
		.required(),
	time_taken_in_seconds: Joi.number().min(0).required(),
});
