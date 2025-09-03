import "dotenv/config";
import "express-async-errors";

import server from "./server";
import { envSchema, TEnvs } from "./validations/env.validations";
import { validateEnv } from "./utils/env.util";
import { verifyDbConnection } from "./db";

export const Envs = process.env as unknown as TEnvs;

async function main() {
	try {
		validateEnv(envSchema, Envs);
		await verifyDbConnection();
		server(Envs);
	} catch (error) {
		console.error(error);
		throw new Error("Failed to start server");
	}
}

main();
