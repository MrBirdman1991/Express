import express from "express";
import { deserializeUser } from "../middleware/deserializeUser";
import cors from "cors";
import routes from "../routes";
import  config from "config";

export function createServer() {
  const app = express();
  app.use(cors({
    origin: config.get<string>("origin"),
    credentials: true
  }))
  app.use(express.json());
  app.use(deserializeUser);
  routes(app);

  return app;
}
