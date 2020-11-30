import { surveysCollection } from "../mongo.ts";
import BaseModel from "./BaseModel.ts";
import { ObjectId } from "../deps.ts";

export default class Survey extends BaseModel {
  public id: string = "";

  constructor(
    public userId: string = "",
    public name: string = "",
    public description: string = "",
  ) {
    super();

    this.userId = userId;
    this.name = name;
    this.description = description;
  }

  static async findByUser(userId: string): Promise<Survey[]> {
    const surveys = await surveysCollection.find({ userId });
    return surveys.map((survey: any) => BaseModel.prepare(survey));
  }

  public async save() {
    try {
      delete this.id;
      const { $oid } = await surveysCollection.insertOne(this);
      this.id = $oid;
      return this;
    } catch (error) {
      throw new Error("error");
    }
  }

  public static async findSurvey(id: string): Promise<Survey | null> {
    try {

      const survey = await surveysCollection.findOne({ _id: ObjectId(id) });
      if (! survey) {
        return null;
      }
      return Survey.prepare(survey);

    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async update(name: string, description: string) {
      try {

        await surveysCollection.updateOne({ _id: ObjectId(this.id) }, { name, description });
        this.name = name;
        this.description = description;

        return this;

      } catch (error) {
          throw new Error(error);
      }
  }

  public async delete() {
    try {
      return await surveysCollection.deleteOne({ _id: ObjectId(this.id) });
    } catch (error) {
      throw new Error(error);
    }
  }

  protected static prepare(data: any): Survey {
    data = BaseModel.prepare(data);
    const survey = new Survey(data.userId, data.name, data.description);
    survey.id = data.id;
    return survey;
  }
}
