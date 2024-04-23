import * as bcrypt from "bcryptjs";

export class CypherService {
  static encrypt(data: string): Promise<string> {
    return bcrypt.hash(data, 10);
  }

  static compare(data: string, encrypted: string): Promise<boolean> {
    return bcrypt.compare(data, encrypted);
  }
}
