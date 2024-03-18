import "reflect-metadata";

import { ServerBootstrap } from "@bootstrap";
import dotenv from "dotenv";

import { app } from "./app";

dotenv.config();

(async () => {
  try {
    const serverBootstrap = new ServerBootstrap(app);

    const taskAsyncronous = [serverBootstrap.initialize()];

    await Promise.all(taskAsyncronous);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
