import { validate } from "uuid";

import { PositionJob } from "../entities/position-job";

/* export interface UserProperties {
  userId: number | undefined;
  name: string;
  lastname: string;
  email: string;
  password: string;
  refreshToken: string;
  positionJobs: PositionJob[];
} */

export interface UserPropertiesRequired {
  name: string;
  lastname: string;
  email: string;
  password: string;
  refreshToken: string;
  positionJobs: PositionJob[];
}

export interface UserPropertiesOptionals {
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export type UserProperties = UserPropertiesRequired &
  Partial<UserPropertiesOptionals>;

export type UserPropertiesToUpdate = Partial<
  Omit<UserPropertiesRequired, "email">
>;

export class User {
  private userId: number | undefined;
  private name: string;
  private lastname: string;
  private email: string;
  private password: string;
  private refreshToken: string;
  private positionJobs: PositionJob[];
  private createdAt: Date;
  private updatedAt: Date | undefined;
  private deletedAt: Date | undefined;

  constructor(props: UserProperties) {
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
      throw new Error("Invalid email or domain");
    }

    if (!validate(props.refreshToken)) throw new Error("Invalid refresh token");

    if (!props.positionJobs.length)
      throw new Error("Position jobs is required");

    Object.assign(this, props);

    /*     this.name = props.name;
    this.lastname = props.lastname;
    this.email = props.email;
    this.password = props.password;
    this.refreshToken = props.refreshToken;
    this.positionJobs = props.positionJobs; */

    if (props.userId) this.userId = props.userId;
    this.createdAt = props.createdAt || new Date();
  }

  get properties() {
    return {
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      refreshToken: this.refreshToken,
      positionJobs: this.positionJobs,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  update(props: UserPropertiesToUpdate) {
    Object.assign(this, props);
    this.updatedAt = new Date();
  }

  delete() {
    this.deletedAt = new Date();
  }
}
