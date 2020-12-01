import { RouterContext, decode } from "../deps.ts";
import User from "../models/User.ts";

export const authMiddleware = async (ctx: RouterContext, next: Function) => {
  const headers = ctx.request.headers;

  const authHeader = headers.get("Authorization");
  if (!authHeader) {
    ctx.response.status = 401;
    return;
  }

  const jwt = authHeader.split(" ")[1];
  if (!jwt) {
    ctx.response.status = 401;
    return;
  }

  try {
    const data = await decode(jwt);

    if (data) {
      const user = await User.findUser({ email: data.payload?.iss });
      ctx.state.user = user;
      await next();
    } else {
      ctx.response.status = 401;
    }
  } catch (error) {
    ctx.response.status = 401;
    ctx.response.body = {
      message: error.message,
    };
  }
};
