import createDebug from "debug";
import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../CustomError/CustomError.js";

const debug = createDebug("fairbook:server");

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  debug(error.message);
  res
    .status(error.statusCode || 500)
    .json({ error: error.publicMessage || "Something went wrong" });
};

export const notFoundError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new CustomError("Endpoint not found", 404, "Path not found");

  next(error);
};
