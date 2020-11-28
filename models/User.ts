import { usersCollection } from "../mongo.ts";
import BaseModel from "./BaseModel.ts";

export default class User extends BaseModel {
  public id: string;
  public name: string;
  public email: string;
  public password: string;

  constructor({ id = "", name = "", email = "", password = "" }) {
    super();

    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  public static async findUser(params: Object) {
    const user = await usersCollection.findOne(params);
    return User.prepare(user);
  }

  public async save() {
    try {
      delete this.id;
      const { $oid } = await usersCollection.insertOne(this);
      this.id = $oid;
      return this;
    } catch (e) {
      throw Error("error");
    }
  }

  protected static prepare(data: any) {
    data = BaseModel.prepare(data);
    const user = new User(data);
    return user;
  }
}
