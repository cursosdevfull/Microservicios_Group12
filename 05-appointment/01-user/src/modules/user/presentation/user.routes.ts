import { Router } from "express";

import { UserApplication } from "../application/user.application";
import { UserInfrastructure } from "../infrastructure/user.infrastructure";
import { UserController } from "./user.controller";

class UserRoutes {
  readonly router: Router;

  constructor(private readonly controller: UserController) {
    this.router = Router(); //express.Router();

    this.mountRoutes();
  }

  private mountRoutes() {
    this.router.post("/", this.controller.create.bind(this.controller));
    this.router.get("/:userId", this.controller.getOne.bind(this.controller));
    this.router.post(
      "/login",
      this.controller.getUserByCredentials.bind(this.controller)
    );
  }
}

const repository = new UserInfrastructure();
const application = new UserApplication(repository);
const controller = new UserController(application);

export const userRouter = new UserRoutes(controller).router;
