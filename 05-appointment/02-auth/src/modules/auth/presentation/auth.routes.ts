import { Router } from "express";

import { AuthApplication } from "../application/auth.application";
import { Http } from "../infrastructure/adapters/http";
import { HttpRepository } from "../infrastructure/adapters/http.repository";
import { AuthInfrastructure } from "../infrastructure/auth.infrastructure";
import { AuthController } from "./auth.controller";

class AuthRoutes {
  readonly router: Router;

  constructor(private readonly controller: AuthController) {
    this.router = Router();

    this.mountRoutes();
  }

  private mountRoutes() {
    this.router.post("/login", this.controller.login.bind(this.controller));
  }
}
const http: HttpRepository = new Http();
const repository = new AuthInfrastructure(http);
const application = new AuthApplication(repository);
const controller = new AuthController(application);

export const authRouter = new AuthRoutes(controller).router;
