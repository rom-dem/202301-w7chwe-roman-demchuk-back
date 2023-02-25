import { type Request, type Response } from "express";
import User from "../../database/models/User";
import { type UserPublic, type UsersPublic } from "../../types.js";
import { getUsers } from "./usersControllers";

const mockUser: UserPublic = {
  avatar: "fotoguapa.jpg",
  username: "rudolfo",
};

const mockUsersList: UsersPublic = [mockUser];

beforeEach(() => jest.restoreAllMocks());

describe("Given a getUsers controllers", () => {
  describe("When it receives a response", () => {
    test("Then it should call its status method with status code 200", async () => {
      const req = {} as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
      } as Partial<Response>;
      const next = jest.fn();
      const expectedStatusCode = 200;

      User.find = jest.fn().mockReturnValue({});
      await getUsers(req, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });
});
