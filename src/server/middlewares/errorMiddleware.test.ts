import { type Response, type NextFunction, type Request } from "express";
import { CustomError } from "../../CustomError/CustomError";
import { generalError, notFoundError } from "./errorMiddleware";

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as Partial<Response>;
const req = {} as Request;
const next = jest.fn() as NextFunction;

describe("Given a generalError middleware", () => {
  describe("When it receives a response and an error with status 400", () => {
    test("Then it should call its status method with 400", () => {
      const statusCode = 400;
      const error = new CustomError(
        "Very bad error",
        statusCode,
        "Very bad error"
      );

      generalError(error, req, res as Response, next);
      expect(res.status).toHaveBeenCalledWith(statusCode);
    });
  });
});

describe("Given a notFoundError middleware", () => {
  describe("When it receives a response", () => {
    test("Then it should call its next method", async () => {
      notFoundError(req, res as Response, next);
      expect(next).toHaveBeenCalled();
    });
  });
});
