import { Request, Response } from "express";
import { Next } from "mysql2/typings/mysql/lib/parsers/typeCast";

export const ResponseInterceptor = (
  req: Request,
  res: Response,
  next: Next
) => {
  const methodOriginal = res.json;
  res.json = function (body) {
    const bodyResponse = {
      data: body,
      status: res.statusCode,
    };
    return methodOriginal.call(this, bodyResponse);
  };

  next();
};
