import * as bcrypt from "bcryptjs";

export class CypherService {
  static encrypt(data: string): Promise<string> {
    return bcrypt.hash(data, 10);
  }
}
