import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { questions } from "./schemas/questions.schema";
import { users } from "./schemas/users.schema";
import { quiz, quizAnswers } from "./schemas/quiz.schema";

export const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, {
	schema: {
		questions,
		users,
		quiz,
		quizAnswers,
	},
});

export async function verifyDbConnection() {
	try {
		await pool.query("SELECT 1");
		console.log("✅ Database connected successfully");
	} catch (err) {
		console.error("❌ Failed to connect to the database:", err);
		throw err;
	}
}
