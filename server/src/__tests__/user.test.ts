import { describe, it, expect, vi } from "vitest";
import * as UserService from "../service/user.service";
import * as SessionService from "../service/session.service";
import mongoose from "mongoose";
import request from "supertest";
import { createServer } from "../utils/server";
import {createUserSessionHandler} from "../controller/session.controller"

const userId = new mongoose.Types.ObjectId().toString();
const userPayload = {
  _id: userId,
  email: "vogel@web.de",
  name: "Julian Vogel",
};

const userInput = {
  email: "test@example.com",
  name: "Jane Doe",
  password: "Password123",
  passwordConfirmation: "Password123",
};

const sessionPayload = {
  _id: new mongoose.Types.ObjectId().toString(),
  user: userId,
  valid: true,
  userAgent: "PostmanRuntime/7.28.4",
  createdAt: new Date("2021-09-30T13:31:07.674Z"),
  updatedAt: new Date("2021-09-30T13:31:07.674Z"),
  __v: 0,
};

const app = createServer();

describe("user", () => {
  describe("user registration", () => {
    describe("given the username and password are valid", () => {
      it("should return the user payload", async (done) => {
        const createUserServiceMock = vi
          .spyOn(UserService, "createUser")
          // @ts-ignore
          .mockReturnValueOnce(userPayload);

        const { statusCode, body } = await request(app)
          .post("/api/users")
          .send({ ...userInput });

        expect(statusCode).toBe(201);
        expect(body).toEqual(userPayload);
        expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
      });
    });

    describe("given the passwords do not match", () => {
      it("should return a 400", async () => {
        const createUserServiceMock = vi
          .spyOn(UserService, "createUser")
          // @ts-ignore
          .mockReturnValueOnce(userPayload);

        const { statusCode } = await request(app)
          .post("/api/users")
          .send({ ...userInput, passwordConfirmation: "doesnotmatch" });

        expect(statusCode).toBe(400);

        expect(createUserServiceMock).not.toHaveBeenCalled();
      });
    });

    describe("given the user service throws", () => {
      it("should return 409", async () => {
        const createUserServiceMock = vi
          .spyOn(UserService, "createUser")
          .mockRejectedValueOnce("oh nou :(");

        const { statusCode } = await request(app)
          .post("/api/users")
          .send({ ...userInput });

        expect(statusCode).toBe(409);

        expect(createUserServiceMock).toHaveBeenCalled();
      });
    });
  });

  describe("create user session", () => {
    describe("given the username and password are valid", () => {
      it("should return a signed accessToken & refresh token", async () => {
        // @ts-ignore
        vi.spyOn(UserService, "validatePassword").mockReturnValue(userPayload);
        // @ts-ignore
        vi.spyOn(SessionService, "createSession").mockReturnValue(sessionPayload);

        const req = {
          get: () => {
            return "a user agent";
          },
          body: {
            email: "test@example.com",
            password: "Password123",
          },
        };

        const send = vi.fn();
        const res = {
          send,
        };

        // @ts-ignore
         await createUserSessionHandler(req, res);


        expect(send).toHaveBeenCalledWith({
          accessToken: expect.any(String),
          refreshToken: expect.any(String),
        });

      });
    });
  });
});
