import { RouterContext } from "../deps.ts";
import Survey from "../models/Survey.ts";

export default class SurveyController {
  public static async getAllForUser(ctx: RouterContext) {
    // const { value } = ctx.request.body({ type: "json" });
    // const { userId } = await value;

    const surveys = await Survey.findByUser("1");
    ctx.response.body = surveys;
  }

  public static async getSingle(ctx: RouterContext) {
    try {
      const id = ctx.params.id!;
      const survey = await Survey.findSurvey(id);

      ctx.response.status = 200;
      ctx.response.body = survey;
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = {
        message: error.messsage,
      };
    }
  }

  public static async create(ctx: RouterContext) {
    const { value } = ctx.request.body({ type: "json" });
    const { userId, name, description } = await value;

    const newSurvey = new Survey("1", name, description);
    await newSurvey.save();

    ctx.response.status = 201;
    ctx.response.body = newSurvey;
  }

  public static async update(ctx: RouterContext) {
  }

  public static async delete(ctx: RouterContext) {
  }
}
