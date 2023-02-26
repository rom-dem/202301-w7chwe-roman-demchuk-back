import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { app } from "../app";
import connectDatabase from "../../database/connectDatabase";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../../database/models/User";
import { type UserPublic, type UserCredentials } from "../../types";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDatabase(server.getUri());
});

afterAll(async () => {
  await server.stop();
  await mongoose.connection.close();
});

const mockUser: UserPublic = {
  avatar: "romualdo.jpg",
  password: "romualdo1234",
  username: "romualdo",
};

describe("Given a POST '/fairbook/register' endpoint", () => {
  describe("When it receives a request with data to create a new user `romualdo`, password 'romualdo1234' and an image file 'romualdo.jpg'", () => {
    test("Then it should respond with status code '201'", async () => {
      const expectedStatus = 201;
      const urlPath = "/fairbook/register";
      const response = await request(app)
        .post(urlPath)
        .send(mockUser)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("username", mockUser.username);
    });
  });
});

describe("Given a POST '/fairbook/login' endpoint", () => {
  describe("When it receives a request with data to login with username 'romualdo' and password 'romualdo1234' and it exists in database", () => {
    test("Then it should respond with status code '200'", async () => {
      const expectedStatus = 200;
      const urlPath = "/fairbook/login";
      const expectedToken = "tokensito";

      jwt.sign = jest.fn().mockReturnValue(expectedToken);

      const response = await request(app)
        .post(urlPath)
        .send(mockUser)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("token", expectedToken);
    });
  });
});
