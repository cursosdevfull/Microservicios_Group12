import "reflect-metadata";

import { DatabaseBootstrap, ServerBootstrap } from "@bootstrap";
import dotenv from "dotenv";

import { app } from "./app";

dotenv.config();

(async () => {
  const serverBootstrap = new ServerBootstrap(app);
  const databaseBootstrap = new DatabaseBootstrap();

  try {
    const taskAsyncronous = [
      serverBootstrap.initialize(),
      databaseBootstrap.initialize(),
    ];

    await Promise.all(taskAsyncronous);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
