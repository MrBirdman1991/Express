import { it } from "vitest";
import request from "supertest";
import { createServer } from "../utils/server";

const app = createServer();

it("should healthcheck", async () => {
  await request(app).get("/healthcheck").expect(200);
});
