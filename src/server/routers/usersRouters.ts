import { Router } from "express";
import { getUsers } from "../controllers/usersControllers.js";

export const usersRouters = Router();

usersRouters.get("/users", getUsers);
