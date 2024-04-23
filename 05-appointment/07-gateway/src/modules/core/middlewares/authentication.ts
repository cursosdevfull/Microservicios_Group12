import { NextFunction, Request, Response } from "express";

export class Authentication {
  static canActivate(req: Request, res: Response, next: NextFunction) {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ") &&
      req.headers.authorization.split(" ").length === 2
    ) {
      return next();
    }

    return res.status(401).json({ message: "Unauthorized" });
  }
}
