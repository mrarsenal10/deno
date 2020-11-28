import { Router, RouterContext } from "./deps.ts";
import authController from "./controllers/AuthController.ts";
import SurveyController from "./controllers/SurveyController.ts";

const router = new Router();

router
  .post("/api/login", authController.login)
  .post("/api/register", authController.register)
  // survey
  .get("/api/survey", SurveyController.getAllForUser)
  .get("/api/survey/:id", SurveyController.getSingle)
  .post("/api/survey", SurveyController.create)
  .put("/api/survey/:id", SurveyController.update)
  .delete("/api/survey/:id", SurveyController.getAllForUser);

export default router;
