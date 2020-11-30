import { Router, RouterContext } from "./deps.ts";
import authController from "./controllers/AuthController.ts";
import surveyController from "./controllers/SurveyController.ts";
import { authMiddleware } from "./middleware/authMiddleware.ts";

const router = new Router();

router
  .post("/api/login", authController.login)
  .post("/api/register", authController.register)
  // survey
  .get("/api/survey", authMiddleware, surveyController.getAllForUser)
  .get("/api/survey/:id", authMiddleware, surveyController.getSingle)
  .post("/api/survey", authMiddleware, surveyController.create)
  .put("/api/survey/:id", authMiddleware, surveyController.update.bind(surveyController))
  .delete("/api/survey/:id", authMiddleware, surveyController.delete.bind(surveyController));

export default router;
