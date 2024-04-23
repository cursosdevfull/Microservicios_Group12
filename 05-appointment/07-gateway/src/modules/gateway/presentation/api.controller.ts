import { Parameters } from "@core";
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";

import { ApiApplication } from "../application/api.application";

@injectable()
export class ApiController {
  constructor(
    @inject("ApiApplication") private readonly application: ApiApplication
  ) {}

  async login(req: Request, res: Response, next: NextFunction) {
    const data = req.body;

    const result = await this.application.endpoint(
      Parameters.serviceUserLogin,
      "POST",
      data
    );

    if (result.isErr()) {
      return next(result.error);
    }

    res.status(200).json(result.value.data);
  }

  async register(req: Request, res: Response, next: NextFunction) {
    const data = req.body;

    const result = await this.application.endpoint(
      Parameters.serviceUserCreate,
      "POST",
      data
    );

    if (result.isErr()) {
      return next(result.error);
    }

    res.status(200).json(result.value.data);
  }
}
