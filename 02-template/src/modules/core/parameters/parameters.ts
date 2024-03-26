import { UserEntity } from "../../user/infrastructure/entities/user.entity";

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

  static get dbConfig(): IDatabaseConfig {
    return {
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
      entities: [UserEntity],
      username: process.env.DB_USERNAME || "root",
      password: process.env.DB_PASSWORD || "root",
      database: process.env.DB_NAME || "test",
      synchronize: process.env.DB_SYNCHRONIZE === "true" || false,
      logging: process.env.DB_LOGGING === "true" || false,
      poolSize: process.env.DB_POOL_SIZE
        ? Number(process.env.DB_POOL_SIZE)
        : 10,
      maxQueryExecutionTime: process.env.DB_MAX_QUERY_EXECUTION_TIME
        ? Number(process.env.DB_MAX_QUERY_EXECUTION_TIME)
        : 1000,
    };
  }
}
