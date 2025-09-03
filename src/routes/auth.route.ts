import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import validate from "../middlewares/validate.middleware";
import { loginSchema, registerSchema } from "../validations/auth.validations";

const router: Router = Router();

router.post("/register", validate(registerSchema), AuthController.register);
router.post("/login", validate(loginSchema), AuthController.login);

export { router as AuthRoutes };
