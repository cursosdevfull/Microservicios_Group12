import { Parameters } from "@core";
import { userRouter } from "@user/presentation";
import express, { Application } from "express";

import { ErrorsInterceptor } from "./modules/core/middlewares/errors.interceptor";
import { ResponseInterceptor } from "./modules/core/middlewares/response.interceptor";
import { swaggerDocs } from "./swagger";

class App {
  readonly app: Application;

  constructor() {
    this.app = express();
    this.init();
  }

  private async init() {
    this.mountMiddlewares();
    this.mountSwagger();
    this.mountRoutes();
    this.mountErrorHandlers();
  }

  private mountMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(ResponseInterceptor);
  }

  private mountSwagger() {
    swaggerDocs(this.app, Parameters.hostname, 4000);
  }

  private mountRoutes() {
    this.app.use("/user", userRouter);
  }

  private mountErrorHandlers() {
    this.app.use(ErrorsInterceptor.NotFound);
    this.app.use(ErrorsInterceptor.General);
  }
}

export const app = new App().app;
