import {
	pgTable,
	serial,
	text,
	timestamp,
	integer,
	unique,
	boolean,
} from "drizzle-orm/pg-core";
import { users } from "./users.schema";
import { relations } from "drizzle-orm";
import { questions } from "./questions.schema";

export const quiz = pgTable("quiz", {
	id: serial().primaryKey(),
	user_id: integer()
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	score: integer().default(0),
	time_taken_in_seconds: integer().default(0),
	created_at: timestamp({ withTimezone: true }).defaultNow(),
	updated_at: timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
});

export const quizAnswers = pgTable(
	"quiz_answers",
	{
		id: serial().primaryKey(),
		quiz_id: integer()
			.notNull()
			.references(() => quiz.id, { onDelete: "cascade" }),
		question_id: integer()
			.notNull()
			.references(() => questions.id, { onDelete: "cascade" }),
		chosen_answer: text().notNull(),
		is_correct: boolean().notNull(),
	},
	(table) => [
		unique("quiz_answers_quiz_id_question_id_unique_constraint").on(
			table.quiz_id,
			table.question_id
		),
	]
);

export const quizRelations = relations(quiz, ({ one, many }) => ({
	user: one(users, { fields: [quiz.user_id], references: [users.id] }),
	quiz_answers: many(quizAnswers),
}));

export const quizAnswersRelations = relations(quizAnswers, ({ one, many }) => ({
	quiz: one(quiz, { fields: [quizAnswers.quiz_id], references: [quiz.id] }),
	question: one(questions, {
		fields: [quizAnswers.question_id],
		references: [questions.id],
	}),
}));
