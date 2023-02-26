import "../../loadEnvironment.js";
import { type NextFunction, type Request, type Response } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../database/models/User.js";
import { type UserCredentials } from "../../types.js";
import { CustomError } from "../../CustomError/CustomError.js";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();

    res.status(200).json({ users });
  } catch (error) {
    const customError = new CustomError(
      "Couldn't access the user list",
      400,
      "Could't retrieve the user list"
    );
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

export const loginUser = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    UserCredentials
  >,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    const customError = new CustomError(
      "User does'nt exist",
      401,
      "Wrong credentials"
    );
    next(customError);
    return;
  }

  if (!(await bcryptjs.compare(password, user.password))) {
    const customError = new CustomError(
      "Password doesn't match",
      401,
      "Wrong credentials"
    );
    next(customError);
    return;
  }

  const jwtPayload = {
    sub: user?._id,
  };

  const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!);

  res.status(200).json({ token });
};
