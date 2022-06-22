import { describe, it, expect, vi } from "vitest";
import * as UserService from "../service/user.service";
import mongoose from "mongoose";
import request from "supertest";
import { createServer } from "../utils/server";

const userId = new mongoose.Types.ObjectId().toString();
const userPayload = {
  _id: userId,
  email: "vogel@web.de",
  name: "Julian Vogel",
};

const userInput = {
  email: "vogel-julian@web.de",
  password: "password1234",
  passwordConfirmation: "password1234",
  name: "Vogel",
};

const app = createServer();

describe("user", () => {
  describe("user registration", () => {
    describe("given the username and password are valid", () => {
      it("should return the user payload", async () => {
        const createUserServiceMock = vi
          .spyOn(UserService, "createUser")
          //@ts-ignore
          .mockReturnValueOnce(userPayload);

        const { statusCode, body } = await request(app).post("/api/users");

        expect(statusCode).toBe(200);
        expect(body).toBe(userPayload);
        expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
      });
    });

    describe("given the passwords do not match", () => {
      it("should return a 400", () => {});
    });

    describe("given email exists", () => {
      it("should return 422", () => {});
    });

    describe("given the user service throws", () => {
      it("should return 409", () => {});
    });
  });

  describe("create user session", () => {
    describe("given the username and password are valid", () => {
      it("should return a signed accessToken & refresh token", () => {});
    });
  });
});
