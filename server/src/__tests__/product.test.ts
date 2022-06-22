import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import mongoose from "mongoose";
import { createServer } from "../utils/server";
import db from "./config/database";
import { createProduct } from "../service/product.service";
import { signJwt } from "../utils/jwt.utils";

const userId = new mongoose.Types.ObjectId().toString();

const productPayload = {
  user: userId,
  title: "Canon EOS 1500D DSLR Camera with 18-55mm Lens",
  description:
    "Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.",
  price: 879.99,
  image: "https://i.imgur.com/QlRphfQ.jpg",
};

const userPayload = {
  _id: userId,
  email: "vogel@web.de",
  name: "Julian Vogel",
};

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

    it("should return 200 if given Product exists", async () => {
      const product = await createProduct(productPayload);

      const { body, statusCode } = await request(app).get(
        `/api/products/${product.productId}`
      );

      expect(statusCode).toBe(200);

      expect(body.productId).toBe(product.productId);
    });
  });

  describe("create product route", () => {
    it("should return 403 if user not logged in", async () => {
      const { statusCode } = await request(app).post("/api/products");

      expect(statusCode).toBe(403);
    });

    it("should return 200 if user is logged in and create Product", async () => {
      const jwt = signJwt(userPayload);
      const { statusCode, body } = await request(app)
        .post("/api/products")
        .set("Authorization", `Bearer ${jwt}`)
        .send(productPayload);

      expect(statusCode).toBe(201);
      expect(body).toEqual({
        __v: 0,
        _id: expect.any(String),
        createdAt: expect.any(String),
        description: productPayload.description,
        image: productPayload.image,
        price: productPayload.price,
        productId: expect.any(String),
        title: productPayload.title,
        updatedAt: expect.any(String),
        user: expect.any(String),
      });
    });
  });
});
