import { deserializeUser } from "./middleware/deserializeUser";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";
import { Express } from "express";
import { createUserHandler } from "./controller/user.controller";
import validateResource from "./middleware/validateResource";
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessions,
} from "./controller/session.controller";
import requireUser from "./middleware/requireUser";

function routes(app: Express) {
  app.get("/healthcheck", (req, res) => {
    res.sendStatus(200);
  });

  app.post("/api/users", validateResource(createUserSchema), createUserHandler);

  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  app.get("/api/sessions", requireUser, getUserSessions);

  app.delete("/api/sessions", requireUser, deleteSessionHandler);
}

export default routes;
