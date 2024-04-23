import { validate } from "class-validator";

export class ValidationService {
  static async runValidation<T extends object>(
    data: { [k: string]: string | number | object },
    constructor: { new (): T }
  ) {
    const instance = new constructor();
    Object.assign(instance, data);

    return await validate(instance);
  }
}
