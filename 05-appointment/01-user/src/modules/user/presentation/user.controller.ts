import { NextFunction, Request, Response } from "express";

import { IError } from "../../core/interface/error.interface";
import { CypherService } from "../../core/presentation/service/cypher.service";
import { UserApplication } from "../application/user.application";
import { UserProperties } from "../domain/roots/user";
import { UserFactory } from "../domain/roots/user.factory";
import { ValidationsUserService } from "./services/validations.service";

//@injectable()
export class UserController {
  constructor(private readonly application: UserApplication) {}

  async create(req: Request, res: Response, next: NextFunction) {
    const errors = await ValidationsUserService.create(req.body);

    if (errors.length > 0) {
      const objError: IError = new Error("Invalid parameters");
      objError.name = "InvalidParameters";
      objError.status = 411;
      objError.message = "Invalid parameters";
      objError.stack = JSON.stringify(errors);
      return next(objError);
    }

    const { name, lastname, email, password, roles } = req.body;
    const userProperties: UserProperties = {
      name,
      lastname,
      email,
      password: await CypherService.encrypt(password),
      roles,
    };
    const userResult = UserFactory.create(userProperties);
    if (userResult.isErr()) {
      return next(userResult.error);
    }

    await this.application.create(userResult.value);

    res.json({ message: "User created" });
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    const errors = await ValidationsUserService.getOne(req.params);

    if (errors.length > 0) {
      const objError: IError = new Error("Invalid parameters");
      objError.name = "InvalidParameters";
      objError.status = 411;
      objError.message = "Invalid parameters";
      objError.stack = JSON.stringify(errors);
      return next(objError);
    }

    const user = await this.application.getById(req.params.userId);
    res.json(user);
  }

  async getUserByCredentials(req: Request, res: Response, next: NextFunction) {
    const errors = await ValidationsUserService.getLogin(req.body);

    if (errors.length > 0) {
      const objError: IError = new Error("Invalid parameters");
      objError.name = "InvalidParameters";
      objError.status = 411;
      objError.message = "Invalid parameters";
      objError.stack = JSON.stringify(errors);
      return next(objError);
    }

    const user = await this.application.getLogin(
      req.body.email,
      req.body.password
    );
    res.json(user);
  }
}
