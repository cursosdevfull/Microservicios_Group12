export interface IPositionJob {
  area: string;
  position: string;
  year: number;
}

export class UserEntity {
  userId: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  refreshToken: string;
  positionJobs: IPositionJob[];
  createdAt: Date;
  updatedAt: Date | undefined;
  deletedAt: Date | undefined;
}
