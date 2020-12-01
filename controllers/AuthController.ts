import {
  RouterContext,
  create,
  Payload,
  Header,
  getNumericDate,
} from "../deps.ts";
import User from "../models/User.ts";

const key = Deno.env.get("JWT_SECRET_KEY")!;

const header: Header = {
  alg: "HS256",
  typ: "JWT",
};

class AuthController {
  public async login(ctx: RouterContext) {
    try {
      if (ctx.request.hasBody) {
        const { value } = ctx.request.body({ type: "json" });
        const { email, password } = await value;

        if (!email || !password) {
          ctx.response.status = 422;
          ctx.response.body = {
            success: false,
            message: "Please provide email and password",
          };
          return;
        }

        const user: any = await User.findUser({ email });
        if (!user) {
          ctx.response.status = 422;
          ctx.response.body = {
            success: false,
            message: "Email is not exists",
          };
          return;
        }

        if (user !== undefined && user.password !== password) {
          ctx.response.status = 422;
          ctx.response.body = {
            success: false,
            message: "Incorrect password",
          };
          return;
        }

        const payload: Payload = {
          iss: user.email,
          exp: getNumericDate(3600),
        };

        ctx.response.body = {
          success: true,
          id: user.id,
          email: user.email,
          name: user.name,
          token: await create(header, payload, key),
        };
      }
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = {
        message: error.message,
      };
    }
  }

  public async register(ctx: RouterContext) {
    try {
      if (ctx.request.hasBody) {
        const { value } = ctx.request.body({ type: "json" });
        const { name, email, password } = await value;

        if (await User.findUser({ email })) {
          ctx.response.status = 409;
          ctx.response.body = {
            success: false,
            message: "Email is already used",
          };
          return;
        }

        const user = new User({ name, email, password });
        const new_user = await user.save();

        ctx.response.status = 200;
        ctx.response.body = {
          success: true,
          ...new_user,
        };
      }
    } catch (error) {
      ctx.response.status = 422;
      ctx.response.body = {
        success: false,
      };
    }
  }
}

const authController = new AuthController();

export default authController;
