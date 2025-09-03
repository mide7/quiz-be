import { pgTable, serial, text, jsonb, timestamp } from "drizzle-orm/pg-core";

export const questions = pgTable("questions", {
	id: serial().primaryKey(),
	text: text().notNull(),
	options: jsonb().$type<string[]>(),
	answer: text().notNull(),
	created_at: timestamp({ withTimezone: true }).defaultNow(),
	updated_at: timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
});
