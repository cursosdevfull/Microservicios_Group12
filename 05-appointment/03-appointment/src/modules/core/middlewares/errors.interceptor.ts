import { NextFunction, Request, Response } from "express";

import { IError } from "../interface/error.interface";

export class ErrorsInterceptor {
  static NotFound(req: Request, res: Response, next: NextFunction) {
    const objError: IError = new Error("Not Found");
    objError.message = "Not Found";
    objError.status = 404;
    next(objError);
  }

  static General(err: IError, req: Request, res: Response, next: NextFunction) {
    res.status(err.status || 500).json({
      name: err.name,
      message: err.message,
      stack: err.stack,
    });
  }
}
