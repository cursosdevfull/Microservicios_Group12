import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export interface IPositionJob {
  area: string;
  position: string;
  year: number;
}

@Entity({ name: "user" })
//@Index(["email", "name"], { unique: true })
export class UserEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "varchar", length: 100 })
  lastname: string;

  @Column({ type: "varchar", length: 100, unique: true })
  email: string;

  @Column({ type: "varchar", length: 100 })
  password: string;

  @Column({ type: "varchar", length: 100 })
  refreshToken: string;

  @Column({ type: "json" })
  positionJobs: object[];

  @Column({ type: "timestamp" })
  createdAt: Date;

  @Column({ type: "timestamp", nullable: true })
  updatedAt: Date;

  @Column({ type: "timestamp", nullable: true })
  deletedAt: Date;
}
