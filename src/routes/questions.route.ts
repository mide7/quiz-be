import { Router } from "express";
import { QuestionsController } from "../controllers/questions.controller";
import validate from "../middlewares/validate.middleware";
import {
	createQuestionSchema,
	editQuestionSchema,
	getQuestionsSchema,
} from "../validations/questions.validations";
import { IdParamSchema } from "../validations";

const router: Router = Router();

router.get(
	"/",
	validate(getQuestionsSchema, { source: "query" }),
	QuestionsController.getQuestions
);
router.post("/", validate(createQuestionSchema), QuestionsController.create);
router.put(
	"/:id",
	validate(IdParamSchema, { source: "params" }),
	validate(editQuestionSchema),
	QuestionsController.edit
);
router.delete(
	"/:id",
	validate(IdParamSchema, { source: "params" }),
	QuestionsController.delete
);

export { router as QuestionsRoutes };
