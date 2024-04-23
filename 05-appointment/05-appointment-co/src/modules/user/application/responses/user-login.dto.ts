export class UserLoginResponseDto {
  userId: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  roles: { name: string }[];
}
