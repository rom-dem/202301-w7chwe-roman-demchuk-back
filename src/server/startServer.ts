import chalk from "chalk";
import createDebug from "debug";
import { app } from "./app.js";

const debug = createDebug("fairbook:server:startServer");

const startServer = async (port: number) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(
        chalk.bgCyanBright(
          chalk.bold(`Server is all ears on http://localhost:${port}, honey`)
        )
      );
    });
    resolve(server);
  });

export default startServer;
