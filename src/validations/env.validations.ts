import Joi from "joi";

export const envSchema = Joi.object({
	PORT: Joi.number().port().required(),
	DATABASE_URL: Joi.string().uri().required(),
	JWT_SECRET: Joi.string().min(6).required(),
	ACCESS_TOKEN_EXPIRES_IN: Joi.string().required(),
	ALLOWED_ORIGINS: Joi.string().required(),
}).unknown(true);

export type TEnvs = {
	PORT: number;
	DATABASE_URL: string;
	JWT_SECRET: string;
	ACCESS_TOKEN_EXPIRES_IN: string;
	ALLOWED_ORIGINS: string;
};
