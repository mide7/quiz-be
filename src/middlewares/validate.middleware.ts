// src/middleware/validate.ts
import { Request, Response, NextFunction } from "express";

import { Schema, ValidationOptions } from "joi";
import { UnprocessableEntityError } from "../utils/custom-errors.util";

interface ValidateOptions extends ValidationOptions {
	source: "body" | "query" | "params";
	pick?: string[]; // Array of schema keys to validate
}

const validate =
	(schema: Schema, options?: ValidateOptions) =>
	(req: Request, _res: Response, next: NextFunction) => {
		const { error, value } = schema.validate(
			req[options?.source || "body"],
			options
		);

		if (error) {
			throw new UnprocessableEntityError(error.details[0].message);
		}

		// Overwrite the original request input with the validated value
		req[options?.source || "body"] = value;

		next();
	};

export default validate;
