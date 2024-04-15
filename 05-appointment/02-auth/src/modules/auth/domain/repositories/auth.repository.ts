export interface AuthRepository {
  getUserByCredentials(email: string, password: string): Promise<any>;
}
