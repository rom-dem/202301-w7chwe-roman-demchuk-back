import { type NextFunction, type Request, type Response } from "express";
import User from "../../database/models/User.js";

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find();

    res.status(200).json({ users });
  } catch (error) {
    const customError = new Error("Error");
    next(customError);
  }
};
