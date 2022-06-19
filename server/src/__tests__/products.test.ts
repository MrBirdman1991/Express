import express from "express";
import { it, describe } from "vitest";
import request from "supertest";

const app = express();

describe("product", () => {
  describe("get product route", () => {
    it("should return 404 if given Product not exists", () => {
      const productId = "123";
      return request(app).get(`/api/products/${productId}`).expect(404);
    });
  });
});
