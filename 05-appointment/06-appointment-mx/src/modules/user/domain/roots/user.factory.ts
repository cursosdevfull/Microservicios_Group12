import { err, ok, Result } from "neverthrow";
import { v4 as uuidv4, validate } from "uuid";

import { User, UserProperties } from "./user";

export type UserCreateResult = Result<User, Error>;

export class UserFactory {
  static create(props: UserProperties): UserCreateResult {
    if (!props.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      return err(new Error("Invalid email"));
    }

    if (!props.refreshToken) {
      props.refreshToken = uuidv4();
    }

    if (!props.userId) {
      props.userId = uuidv4();
    } else {
      if (!validate(props.userId)) {
        return err(new Error("Invalid uuid"));
      }
    }

    return ok(new User(props));
  }
}
