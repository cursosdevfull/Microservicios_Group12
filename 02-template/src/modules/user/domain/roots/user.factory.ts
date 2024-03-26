import { err, ok, Result } from "neverthrow";
import { v4 as uuidv4 } from "uuid";

import { User, UserProperties } from "./user";

export type UserCreateResult = Result<User, Error>;

export class UserFactory {
  static create(props: UserProperties): UserCreateResult {
    const domainsAllow = [
      "company.com",
      "external.company.com",
      "sales.company.com",
    ];

    const regex = new RegExp(
      `^[a-z0-9._%+-]+@(${domainsAllow.join("|")})$`,
      "i"
    );

    if (!props.email.match(regex)) {
      return err(new Error("Invalid email or domain"));
    }

    if (!props.refreshToken) {
      props.refreshToken = uuidv4();
    }

    if (!props.positionJobs.length)
      return err(new Error("Position jobs is required"));

    return ok(new User(props));
  }
}
