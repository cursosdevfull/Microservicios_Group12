export interface HttpRepository {
  login(email: string, password: string): Promise<any>;
}
