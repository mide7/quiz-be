// src/db/types.ts
import { questions } from "./schemas/questions.schema";
import { users } from "./schemas/users.schema";
import { InferSelectModel } from "drizzle-orm";

export type User = InferSelectModel<typeof users>;
export type Question = InferSelectModel<typeof questions>;
