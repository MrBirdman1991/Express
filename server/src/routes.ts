import { createUserSchema } from "./schema/user.schema";
import { Express } from "express";
import { createUserHandler } from "./controller/user.controller";
import validateResource from "./middleware/validateResource";

function routes(app: Express) {
  app.get("/healthcheck", (req, res) => {
    res.sendStatus(200);
  });

  app.post("/api/users", validateResource(createUserSchema), createUserHandler);
}

export default routes;
