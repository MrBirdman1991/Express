import config from "config";
import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import { createSession, findSessions } from "../service/session.service";
import { signJwt } from "../utils/jwt.utils";

export async function createUserSessionHandler(
  req: Request<{}, {}, { password: string; email: string }>,
  res: Response
) {
  const { email, password } = req.body;
  const user = await validatePassword(email, password);

  if (!user) return res.status(401).send("invalid email or password");

  const session = await createSession(user._id, req.get("User-Agent") || "");

  const accessToken = signJwt(
    { ...user, session: session._id },
    {
      expiresIn: config.get("accessTokenTtl"),
    }
  );

  const refreshToken = signJwt(
    { ...user, session: session._id },
    {
      expiresIn: config.get("refreshTokenTtl"),
    }
  );

  return res.send({ accessToken, refreshToken });
}

export async function getUserSessions(req: Request, res: Response) {
  const userId = res.locals.user._id as string;

  const sessions = await findSessions({ user: userId, valid: true });

  return res.send(sessions);
}
