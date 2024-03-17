import { userRouter } from "@user/presentation";
import express, { Application } from "express";

class App {
  readonly app: Application;

  constructor() {
    this.app = express();
    this.mountRoutes();
  }

  private mountRoutes() {
    this.app.use("/user", userRouter);
  }
}

export const app = new App().app;
