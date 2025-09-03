import { desc, eq, like, lt, sql } from "drizzle-orm";
import { db } from "../db";
import { questions } from "../db/schemas/questions.schema";
import type {
	CreateQuestionResponse,
	DeleteQuestionResponse,
	EditQuestionResponse,
	GetQuestionsResponse,
} from "../types/responses";

import type {
	CreateQuestionRequest,
	DeleteQuestionRequest,
	EditQuestionRequest,
	GetQuestionsRequest,
} from "../types/requests";
import {
	formatPaginationResponse,
	formatResponse,
} from "../utils/response-formatter.util";
import { NotFoundError } from "../utils/custom-errors.util";

export class QuestionsService {
	static async create(
		input: CreateQuestionRequest
	): Promise<CreateQuestionResponse> {
		const [question] = await db
			.insert(questions)
			.values({
				text: input.text,
				options: input.options,
				answer: input.answer,
			})
			.returning()
			.execute();

		return formatResponse(question);
	}

	static async edit(
		id: number,
		input: EditQuestionRequest
	): Promise<EditQuestionResponse> {
		const [question] = await db
			.update(questions)
			.set(input)
			.where(eq(questions.id, id))
			.returning()
			.execute();

		return formatResponse(question);
	}

	static async delete(
		input: DeleteQuestionRequest
	): Promise<DeleteQuestionResponse> {
		const [question] = await db
			.delete(questions)
			.where(eq(questions.id, input.id))
			.returning()
			.execute();

		if (!question) throw new NotFoundError("Question not found");

		return formatResponse(question);
	}

	static async getQuestions(
		filter: GetQuestionsRequest
	): Promise<GetQuestionsResponse> {
		if (filter.fetch_all) {
			return this.getAllQuestions();
		}

		// Determine pagination type
		const isOffsetPagination =
			filter.page !== undefined || filter.limit !== undefined;
		const isCursorPagination =
			filter.cursor !== undefined || filter.take !== undefined;

		if (isCursorPagination && !isOffsetPagination) {
			return this.getQuestionsCursor(filter);
		} else {
			// Default to offset pagination
			return this.getQuestionsOffset(filter);
		}
	}

	private static async getAllQuestions(): Promise<GetQuestionsResponse> {
		const result = await db.select().from(questions);
		return formatPaginationResponse(
			result.map(({ answer, ...q }) => q),
			{
				total: result.length,
				page: 1,
				limit: result.length,
				totalPages: 1,
				hasNextPage: false,
				hasPreviousPage: false,
				nextCursor: undefined,
				prevCursor: undefined,
			}
		);
	}

	private static async getQuestionsOffset(
		filter: GetQuestionsRequest
	): Promise<GetQuestionsResponse> {
		const page = filter.page || 1;
		const limit = filter.limit || 1;
		const offset = (page - 1) * limit;

		return db.transaction(async (trx) => {
			// Build queries with filters
			let query = trx.select().from(questions).$dynamic();
			let countQuery = trx
				.select({ count: sql<number>`count(*)` })
				.from(questions)
				.$dynamic();

			// Apply filters
			if (filter.search) {
				const searchCondition = like(
					questions.text,
					`%${filter.search}%`
				);
				query = query.where(searchCondition);
				countQuery = countQuery.where(searchCondition);
			}

			// Apply pagination
			query = query
				.orderBy(desc(questions.created_at))
				.limit(limit)
				.offset(offset);

			const [result, countResult] = await Promise.all([
				query.execute(),
				countQuery.execute(),
			]);

			const total = countResult[0]?.count || 0;
			const totalPages = Math.ceil(total / limit);

			return formatPaginationResponse(
				result.map(({ answer, ...q }) => q),
				{
					page,
					limit,
					total,
					totalPages,
					hasNextPage: page < totalPages,
					hasPreviousPage: page > 1,
					nextCursor: undefined,
					prevCursor: undefined,
				}
			);
		});
	}

	private static async getQuestionsCursor(
		filter: GetQuestionsRequest
	): Promise<GetQuestionsResponse> {
		const take = filter.take || 1;

		return await db.transaction(async (trx) => {
			// Build base query
			let query = trx.select().from(questions).$dynamic();

			// Apply filters
			if (filter.search) {
				query = query.where(like(questions.text, `%${filter.search}%`));
			}

			// Apply cursor-based pagination
			if (filter.cursor) {
				// Assuming cursor is the ID of the last item from previous page
				query = query.where(lt(questions.id, filter.cursor));
			}

			// Order and limit
			query = query
				.orderBy(desc(questions.id)) // Use ID for consistent ordering
				.limit(take + 1); // Take one extra to check if there's a next page

			const result = await query.execute();

			// Check if there are more items
			const hasNextPage = result.length > take;
			const data = hasNextPage ? result.slice(0, take) : result;

			// Generate cursors
			const nextCursor =
				hasNextPage && data.length > 0
					? data[data.length - 1].id
					: undefined;

			const prevCursor = filter.cursor || undefined;

			return formatPaginationResponse(
				data.map(({ answer, ...q }) => q),
				{
					page: 0, // Not applicable for cursor-based
					limit: take,
					total: 0, // Usually not calculated for cursor-based for performance
					totalPages: 0,
					hasNextPage,
					hasPreviousPage: !!filter.cursor,
					nextCursor,
					prevCursor,
				}
			);
		});
	}
}
