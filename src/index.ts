import "./loadEnvironment.js";
import { app } from "./server/app.js";
import startServer from "./server/startServer.js";

const port = process.env.PORT ?? 4000;

await startServer(+port);
