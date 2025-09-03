import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { StatusCodes } from "http-status-codes";

export class AuthController {
	static async register(req: Request, res: Response) {
		const data = await AuthService.register(req.body);
		res.status(StatusCodes.OK).json(data);
	}

	static async login(req: Request, res: Response) {
		const data = await AuthService.login(req.body);
		res.status(StatusCodes.OK).json(data);
	}
}
