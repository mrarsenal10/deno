import { Router, RouterContext } from "./deps.ts";
import authController from "./controllers/AuthController.ts";
import surveyController from "./controllers/SurveyController.ts";

const router = new Router();

router
  .post("/api/login", authController.login)
  .post("/api/register", authController.register)
  // survey
  .get("/api/survey", surveyController.getAllForUser)
  .get("/api/survey/:id", surveyController.getSingle)
  // .post("/api/survey", surveyController.create)
  .put("/api/survey/:id", surveyController.update.bind(surveyController))
  .delete("/api/survey/:id", surveyController.delete.bind(surveyController));

export default router;
