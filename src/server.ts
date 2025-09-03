import http from "http";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";

import { AuthRoutes, QuestionsRoutes, QuizRoutes } from "./routes/_index";
import { HttpError, NotFoundError } from "./utils/custom-errors.util";
import { formatResponse } from "./utils/response-formatter.util";
import { TEnvs } from "./validations/env.validations";
import { authGuard } from "./middlewares/auth-guard.middleware";

const app = express();
const server = http.createServer(app);

export default function (Envs: TEnvs) {
	app.use(helmet()); // Sets various HTTP headers for security
	app.use(cors({ credentials: true, origin: Envs.ALLOWED_ORIGINS })); // Enables Cross-Origin Resource Sharing for all origins
	app.use(express.json()); // Enables JSON parsing

	// API Routes
	app.use("/api/auth", AuthRoutes);
	app.use("/api/questions", authGuard, QuestionsRoutes);
	app.use("/api/quiz", authGuard, QuizRoutes);

	// Catch-all for undefined routes
	app.use((_req: Request, _res: Response, next: NextFunction) => {
		next(new NotFoundError("Route not found"));
	});

	// Global error handler
	app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
		if (err instanceof HttpError) {
			return res
				.status(err.status)
				.json(formatResponse(null, err.message));
		}

		console.error(err.stack);
		return res
			.status(500)
			.json(formatResponse(null, "An unexpected error occurred."));
	});

	server.listen(Envs.PORT, () => {
		console.log(`Server is running on port ${Envs.PORT}`);
	});
}
