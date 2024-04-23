export class UserGetOneResponseDto {
  userId: string;
  name: string;
  lastname: string;
  email: string;
  roles: { roleId: string }[];
}
