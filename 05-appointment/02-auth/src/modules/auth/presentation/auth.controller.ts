import { NextFunction, Request, Response } from "express";

import { IError } from "../../core/interface/error.interface";
import { AuthApplication } from "../application/auth.application";
import { ValidationsAuthService } from "./services/validations.service";

export class AuthController {
  constructor(private readonly application: AuthApplication) {}

  async login(req: Request, res: Response, next: NextFunction) {
    const errors = await ValidationsAuthService.login(req.body);

    if (errors.length > 0) {
      const objError: IError = new Error("Invalid parameters");
      objError.name = "InvalidParameters";
      objError.status = 411;
      objError.message = "Invalid parameters";
      objError.stack = JSON.stringify(errors);
      return next(objError);
    }

    const { email, password } = req.body;

    const result = await this.application.login(email, password);

    if (!result) {
      const objError: IError = new Error("Invalid credentials");
      objError.name = "InvalidCredentials";
      objError.status = 401;
      objError.message = "Invalid credentials";
      return next(objError);
    }

    res.status(200).json(result);
  }
}
