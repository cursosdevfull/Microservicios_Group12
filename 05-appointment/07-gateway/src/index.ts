import "reflect-metadata";

import { ServerBootstrap } from "@bootstrap";
import dotenv from "dotenv";

import { app } from "./app";

dotenv.config({ path: "env.txt" });

const serverBootstrap = new ServerBootstrap(app);

(async () => {
  try {
    const taskAsyncronous = [serverBootstrap.initialize()];

    await Promise.all(taskAsyncronous);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();

/*const shutdownBySignal = (signalName: string) => {
  return async () => {
    console.log(`Shutting down server with ${signalName}`);
    if (serverBootstrap)
      serverBootstrap.getInstanceServer().close(() => {
        console.log("Server closed");
        process.exit(0);
      });

    setTimeout(() => {
      console.error(
        "Could not close connections in time, forcefully shutting down"
      );
      process.exit(1);
    }, 5000);
  };
};

process
  .on("SIGINT", shutdownBySignal("SIGINT"))
  .on("SIGTERM", shutdownBySignal("SIGTERM"))
  .on("SIGUSR2", shutdownBySignal("SIGUSR2"))
  .on("exit", shutdownBySignal("exit"))
  .on("unhandledRejection", shutdownBySignal("unhandledRejection"))
  .on("uncaughtException", shutdownBySignal("uncaughtException"));*/
