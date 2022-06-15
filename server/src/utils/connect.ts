import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

function connect() {
  const dbUri = config.get<string>("dbUri");

  return mongoose
    .connect(dbUri)
    .then(() => {
      logger.info("db is running");
    })
    .catch((err) => {
      logger.error(err.message);
      process.exit(1);
    });
}

export default connect;
