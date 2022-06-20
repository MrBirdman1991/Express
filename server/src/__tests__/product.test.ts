import { describe, it, beforeAll, afterEach, afterAll } from "vitest";
import request from "supertest";
import { createServer } from "../utils/server";
import db from "./config/database";

const app = createServer();

beforeAll(() => {
  db.connect();
});
afterAll(() => {
  db.close();
});

describe("product", () => {
  describe("get product route", () => {
    it("should return 404 if given Product not exists", async () => {
      const productId = "1234";
      await request(app).get(`/api/products/${productId}`).expect(404);
    });
  });
});
