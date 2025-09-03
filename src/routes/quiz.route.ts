import { Router } from "express";
import validate from "../middlewares/validate.middleware";
import { QuizController } from "../controllers/quiz.controller";
import { submitQuizAnswerSchema } from "../validations/quiz.validations";

const router: Router = Router();

router.get("/start", QuizController.startQuiz);
router.post(
	"/submit",
	validate(submitQuizAnswerSchema),
	QuizController.submitQuizAnswer
);

export { router as QuizRoutes };
