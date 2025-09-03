// src/types/global.d.ts
import type { User } from "../db/types";

declare global {
	namespace Express {
		export interface Locals {
			user: Pick<User, "id">; // user will now exist on res.locals.user
		}
	}
}
