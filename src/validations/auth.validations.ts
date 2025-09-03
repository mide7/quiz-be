import Joi from "joi";
import {
	EmailStringSchema,
	PasswordStringSchema,
	UsernameStringSchema,
} from ".";
import type { LoginRequest, RegisterRequest } from "../types/requests";

export const registerSchema = Joi.object<RegisterRequest>({
	username: UsernameStringSchema,
	email: EmailStringSchema,
	password: PasswordStringSchema,
});

export const loginSchema = Joi.object<LoginRequest>({
	email: EmailStringSchema,
	password: PasswordStringSchema,
});
