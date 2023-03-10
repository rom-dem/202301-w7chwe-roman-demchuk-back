import { Router } from "express";
import multer from "multer";
import {
  createUser,
  getUsers,
  loginUser,
} from "../controllers/usersControllers.js";

export const usersRouters = Router();

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "uploads/");
  },
  filename(req, file, callback) {
    callback(
      null,
      `${Date.now()}-${(Math.random() * 1000).toFixed(0)}-${file.originalname}`
    );
  },
});

const upload = multer({ storage, limits: { fileSize: 1000000 } });

usersRouters.get("/get", getUsers);
usersRouters.post("/register", upload.single("avatar"), createUser);
usersRouters.post("/login", loginUser);
