import { Request, Response } from "express";
import { QuestionsService } from "../services/questions.service";
import { StatusCodes } from "http-status-codes";

export class QuestionsController {
	static async create(req: Request, res: Response) {
		const data = await QuestionsService.create(req.body);
		res.status(StatusCodes.CREATED).json(data);
	}

	static async getQuestions(req: Request, res: Response) {
		const data = await QuestionsService.getQuestions(req.query);
		res.status(StatusCodes.OK).json(data);
	}

	static async edit(req: Request, res: Response) {
		const data = await QuestionsService.edit(+req.params.id, req.body);
		res.status(StatusCodes.OK).json(data);
	}

	static async delete(req: Request, res: Response) {
		const data = await QuestionsService.delete({ id: +req.params.id });
		res.status(StatusCodes.OK).json(data);
	}
}
