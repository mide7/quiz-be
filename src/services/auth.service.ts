import { eq, or } from "drizzle-orm";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { db } from "../db";
import { users } from "../db/schemas/users.schema";
import { BadRequestError } from "../utils/custom-errors.util";
import { formatResponse } from "../utils/response-formatter.util";
import { Envs } from "..";

import type { User } from "../db/types";
import type { LoginRequest, RegisterRequest } from "../types/requests";
import type { AuthResponse } from "../types/responses";

export class AuthService {
	static async register(input: RegisterRequest): Promise<AuthResponse> {
		const [existing_user] = await db
			.select()
			.from(users)
			.where(
				or(
					eq(users.email, input.email),
					eq(users.username, input.username)
				)
			)
			.execute();

		if (existing_user) {
			throw new BadRequestError("Email or username already taken");
		}

		const [user] = await db
			.insert(users)
			.values({
				email: input.email,
				username: input.username,
				password: await bcrypt.hash(input.password, 10),
			})
			.returning()
			.execute();

		return formatResponse({
			token: await this.generateToken(user),
			user: { id: user.id, email: user.email, username: user.username },
		});
	}

	static async login(input: LoginRequest): Promise<AuthResponse> {
		const [user] = await db
			.select()
			.from(users)
			.where(eq(users.email, String(input.email)))
			.execute();

		if (!user) {
			throw new BadRequestError("Invalid email or password");
		}

		const isValidPassword = await bcrypt.compare(
			input.password,
			user.password
		);

		if (!isValidPassword) {
			throw new BadRequestError("Invalid email or password");
		}

		return formatResponse({
			token: await this.generateToken(user),
			user: { id: user.id, email: user.email, username: user.username },
		});
	}

	static async generateToken(user: User) {
		return jwt.sign({ id: user.id }, Envs.JWT_SECRET, {
			expiresIn: "1day",
		});
	}
}
