import Joi from "joi";
import { IdParamSchema } from ".";
import { CreateQuestionRequest, GetQuestionsRequest } from "../types/requests";

export const createQuestionSchema = Joi.object<CreateQuestionRequest>({
	text: Joi.string().required(),
	options: Joi.array().items(Joi.string().min(1)).required().length(4),
	answer: Joi.string().required().valid(Joi.in("options")).messages({
		"any.only": "answer must be one of the provided options",
	}),
});

export const editQuestionSchema = createQuestionSchema;

export const deleteQuestionSchema = IdParamSchema;

export const getQuestionsSchema = Joi.object<GetQuestionsRequest>({
	page: Joi.number().default(1).optional(),
	limit: Joi.number().default(1).optional(),

	// Cursor-based pagination (alternative)
	cursor: Joi.number().optional(),
	take: Joi.number().default(1).optional(),

	// Filters
	search: Joi.string().optional(),
	fetch_all: Joi.boolean().default(false).optional(),
});
