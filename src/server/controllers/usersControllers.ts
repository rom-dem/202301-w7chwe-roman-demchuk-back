import { type NextFunction, type Request, type Response } from "express";
import bcryptjs from "bcryptjs";
import User from "../../database/models/User.js";
import { type UserPublic, type UserCredentials } from "../../types.js";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();

    res.status(200).json({ users });
  } catch (error) {
    const customError = new Error("Error");
    next(customError);
  }
};

export const createUser = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    UserCredentials
  >,
  res: Response,
  next: NextFunction
) => {
  const { password, username } = req.body;
  const avatar = req.file?.filename;
  const hashedPassword = await bcryptjs.hash(password, 8);

  await User.create({
    username,
    password: hashedPassword,
    avatar,
  });

  res.status(201).json({ username });
};
