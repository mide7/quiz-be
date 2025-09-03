import { relations } from "drizzle-orm";
import {
	pgTable,
	serial,
	text,
	uniqueIndex,
	varchar,
	timestamp,
} from "drizzle-orm/pg-core";
import { quiz } from "./quiz.schema";

export const users = pgTable(
	"users",
	{
		id: serial().primaryKey(),
		email: text().notNull(),
		username: varchar({ length: 50 }),
		password: varchar().notNull(),
		created_at: timestamp({ withTimezone: true }).defaultNow(),
		updated_at: timestamp({ withTimezone: true }).$onUpdate(
			() => new Date()
		),
	},
	(table) => [
		uniqueIndex("user_email_index").on(table.email),
		uniqueIndex("user_username_index").on(table.username),
	]
);

export const usersRelations = relations(users, ({ one, many }) => ({
	quiz: many(quiz),
}));
