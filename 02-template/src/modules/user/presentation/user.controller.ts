import { Request, Response } from "express";
import { injectable } from "inversify";

@injectable()
export class UserController {
  async create(req: Request, res: Response) {
    res.send("User created");
  }
}
