export interface IDatabaseConfig {
  host: string;
  port: number;
  entities: any[];
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
  poolSize: number;
  maxQueryExecutionTime: number;
}

export class Parameters {
  static get port(): number {
    return process.env.PORT ? Number(process.env.PORT) : 3000;
  }

  static get hostname(): string {
    return process.env.APP_HOSTNAME || "localhost";
  }

  static get tokenSecret(): string {
    return process.env.TOKEN_SECRET;
  }

  static get tokenExpiration(): string {
    return process.env.TOKEN_EXPIRATION || "1h";
  }
}
