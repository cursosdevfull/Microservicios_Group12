import { container } from "@core";
import { Router } from "express";

import { UserController } from "./user.controller";

class UserRoutes {
  readonly router: Router;
  private controller: UserController;

  constructor() {
    this.router = Router(); //express.Router();
    this.controller = container.get("UserController");
    this.mountRoutes();
  }

  private mountRoutes() {
    this.router.post("/", this.controller.create);
  }
}

export const userRouter = new UserRoutes().router;
