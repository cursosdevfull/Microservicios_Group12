import { Router } from "express";

import { Authentication } from "../../core/middlewares/authentication";
import { ApiApplication } from "../application/api.application";
import { ApiInfrastructure } from "../infrastructure/api.infrastructure";
import { ApiController } from "./api.controller";

class ApiRoutes {
  readonly router: Router;

  constructor(private readonly controller: ApiController) {
    this.router = Router();

    this.mountRoutes();
  }

  private mountRoutes() {
    this.router.post("/login", this.controller.login.bind(this.controller));
    this.router.post(
      "/register",
      // Authentication.canActivate,
      this.controller.register.bind(this.controller)
    );
    this.router.post(
      "/appointment",
      Authentication.canActivate,
      this.controller.createAppointment.bind(this.controller)
    );
  }
}
const repository = new ApiInfrastructure();
const application = new ApiApplication(repository);
const controller = new ApiController(application);

export const apiRouter = new ApiRoutes(controller).router;
