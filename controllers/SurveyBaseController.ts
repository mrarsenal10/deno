import Survey from "../models/Survey.ts";
import User from "../models/User.ts";
import { RouterContext } from "../deps.ts";

export default class SurveyBaseController {
  protected async findSurveyOrFail(
    id: string,
    ctx: RouterContext
  ): Promise<Survey | null> {
    try {
      const survey = await Survey.findSurvey(id);

      if (!survey) {
        ctx.response.status = 404;
        ctx.response.body = {
          message: "Survey not found",
        };
        return null;
      }

      const user = ctx.state.user as User;
      if (user.id !== survey.userId) {
        ctx.response.status = 403;
        ctx.response.body = {
          message: `You don't have permission on this survey`,
        };
        return null;
      }

      return survey;
    } catch (error) {
      throw new Error(error);
    }
  }
}
