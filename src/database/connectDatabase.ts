import "./connectDatabase.js";
import chalk from "chalk";
import createDebug from "debug";

const debug = createDebug("fairbook:database");

import mongoose from "mongoose";

const connectDatabase = async (url: string) => {
  mongoose.set("strictQuery", false);

  try {
    await mongoose.connect(url);
    debug(chalk.green("Connected to data base"));
  } catch (error) {
    debug("Check the cables in your internet box");
    throw new Error("Error while connecting to data base");
  }
};

export default connectDatabase;
