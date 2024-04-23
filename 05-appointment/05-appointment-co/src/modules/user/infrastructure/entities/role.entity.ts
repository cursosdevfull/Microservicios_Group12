import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";

import { UserEntity } from "./user.entity";

@Entity({ name: "role" })
export class RoleEntity {
  @PrimaryColumn()
  roleId: string;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @ManyToMany(() => UserEntity, (user) => user.roles)
  users: UserEntity[];
}
