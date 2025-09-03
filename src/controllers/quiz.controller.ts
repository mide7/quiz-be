import { Request, Response } from "express";
import { QuestionsService } from "../services/questions.service";
import { StatusCodes } from "http-status-codes";
import { QuizService } from "../services/quiz.service";

export class QuizController {
	static async startQuiz(_req: Request, res: Response) {
		const data = await QuestionsService.getQuestions({ fetch_all: true });
		res.status(StatusCodes.OK).json(data);
	}

	static async submitQuizAnswer(req: Request, res: Response) {
		const data = await QuizService.submitQuizAnswer(
			res.locals.user.id,
			req.body
		);
		res.status(StatusCodes.OK).json(data);
	}
}
