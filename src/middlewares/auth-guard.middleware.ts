import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Envs } from "..";
import { UnauthorizedError } from "../utils/custom-errors.util";
import { User } from "../db/types";

export function authGuard(req: Request, res: Response, next: NextFunction) {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		throw new UnauthorizedError("No authorization header found");
	}

	const token = authHeader.split(" ")[1];

	if (!token) {
		throw new UnauthorizedError("No authorization token found");
	}

	try {
		const decoded = jwt.verify(token, Envs.JWT_SECRET) as Pick<User, "id">;

		res.locals.user = decoded;

		next();
	} catch (error: any) {
		console.error("Auth guard error:", error.message);
		throw new UnauthorizedError("Invalid or expired token");
	}
}
