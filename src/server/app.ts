import morgan from "morgan";
import express from "express";
import cors from "cors";
import { usersRouters } from "./routers/usersRouters.js";
import { generalError, notFoundError } from "./middlewares/errorMiddleware.js";

export const app = express();

app.disable("x-powered-by");

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/fairbook", usersRouters);

app.use("/", notFoundError);
app.use("/", generalError);
