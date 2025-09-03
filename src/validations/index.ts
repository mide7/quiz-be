import Joi from "joi";

// A utility type to infer the type from a Joi schema
export type InferSchemaType<T> = T extends Joi.ObjectSchema<infer R>
	? R
	: never;

export const UsernameStringSchema = Joi.string()
	.alphanum()
	.min(3)
	.max(30)
	.required();
export const EmailStringSchema = Joi.string().email().required();
export const PasswordStringSchema = Joi.string().min(6).required();
export const IdParamSchema = Joi.object({
	id: Joi.number().required(),
});
