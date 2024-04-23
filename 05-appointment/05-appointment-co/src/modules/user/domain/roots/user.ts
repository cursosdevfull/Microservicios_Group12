import { Role } from "../entities/role";

export interface UserPropertiesRequired {
  name: string;
  lastname: string;
  email: string;
  password: string;
  roles: Role[];
}

export interface UserPropertiesOptionals {
  userId: string;
  refreshToken: string;
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
  private userId: string | undefined;
  private name: string;
  private lastname: string;
  private email: string;
  private password: string;
  private refreshToken: string;
  private roles: Role[];
  private createdAt: Date;
  private updatedAt: Date | undefined;
  private deletedAt: Date | undefined;

  constructor(props: UserProperties) {
    Object.assign(this, props);

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
      userId: this.userId,
      roles: this.roles,
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
