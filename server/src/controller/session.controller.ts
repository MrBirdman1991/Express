import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import { createSession } from "../service/session.service";

export async function createUserSessionHandler(
  req: Request<{}, {}, { password: string; email: string }>,
  res: Response
) {
  const { email, password } = req.body;
  const user = await validatePassword(email, password);

  if (!user) return res.status(401).send("invalid email or password");

  const session = createSession(user._id, req.get("User-Agent") || "");
}
