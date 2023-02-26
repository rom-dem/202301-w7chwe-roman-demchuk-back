import { type Request, type Response } from "express";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../database/models/User";
import { type UserCredentials, type UserPublic } from "../../types.js";
import { getUsers, loginUser } from "./usersControllers";

beforeEach(() => jest.restoreAllMocks());

const req = {} as Request;
const res = {
  status: jest.fn().mockReturnThis(),
} as Partial<Response>;
const next = jest.fn();

describe("Given a getUsers controllers", () => {
  const mockUser: UserPublic = {
    avatar: "rudolfo.jpg",
    username: "rudolfo",
    password: "rudolfo1234",
  };
  describe("When it receives a response", () => {
    test("Then it should call its status method with status code 200", async () => {
      const expectedStatusCode = 200;

      User.find = jest.fn().mockReturnValue({});
      await getUsers(req, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });
});
