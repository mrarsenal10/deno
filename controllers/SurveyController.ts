import { RouterContext } from "../deps.ts";
import Survey from "../models/Survey.ts";
import SurveyBaseController from "./SurveyBaseController.ts";
class SurveyController extends SurveyBaseController {
  constructor() {
    super();
  }

  public async getAllForUser(ctx: RouterContext) {
    // const { value } = ctx.request.body({ type: "json" });
    // const { userId } = await value;

    const surveys = await Survey.findByUser("1");
    ctx.response.body = surveys;
  }

  public async getSingle(ctx: RouterContext) {
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

  public async create(ctx: RouterContext) {
    const { value } = ctx.request.body({ type: "json" });
    const { userId, name, description } = await value;

    const newSurvey = new Survey("1", name, description);
    await newSurvey.save();

    ctx.response.status = 201;
    ctx.response.body = newSurvey;
  }

  public async update(ctx: RouterContext) {
    try {

      const id = ctx.params.id!;
      const survey = await this.findSurveyOrFail(id, ctx);

      if (survey) {
        const { value } = ctx.request.body({ type: "json" });
        const { userId, name, description } = await value;

        await survey.update(name, description);

        ctx.response.status = 200;
        ctx.response.body = survey;
      }

    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = {
        message: error.message
      };
    }
  }

  public async delete(ctx: RouterContext) {
    try {
        const id = ctx.params.id!;
        const survey = await this.findSurveyOrFail(id, ctx);
        if (!survey) {
          ctx.response.status = 400;
          ctx.response.body = {
            message: 'Survey not found'
          };
          return;
        }

        await survey.delete();
        ctx.response.status = 204;
        ctx.response.body = {
          message: 'Deleted'
        };

    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = {
        message: error.message
      };
    }
  }
}

const surveyController = new SurveyController();
export default surveyController;