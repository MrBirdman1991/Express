import { Request, Response } from "express";
import { CreateUserInput } from "./../schema/user.schema";
import { createUser, findUser } from "../service/user.service";
import logger from "../utils/logger";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
   const existingUser = await findUser({ email: req.body.email });
   if (existingUser) return res.sendStatus(422);

    const user = await createUser(req.body);
    return res.status(201).json(user);
  } catch (err: any) {
    logger.error(err);
    return res.status(409).send(err.message);
  }
}
