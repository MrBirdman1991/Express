import { Express } from "express";

function routes(app: Express) {
  app.get("/healthcheck", (req, res) => {
    res.sendStatus(200);
  });
}

export default routes;
