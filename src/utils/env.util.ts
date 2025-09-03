import { Schema } from "joi";

export function validateEnv(envSchema: Schema, env: Record<string, any>) {
	const { error } = envSchema.validate(env);
	if (error) {
		const validationErrors = error.details
			.map((err) => err.message)
			.join(", ");
		console.error("Environment validation failed:", validationErrors);
		process.exit(1);
	}
}
