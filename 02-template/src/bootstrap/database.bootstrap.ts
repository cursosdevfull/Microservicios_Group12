import { Parameters } from "@core";
import { DataSource } from "typeorm";

import { IDatabaseConfig } from "../modules/core/parameters/parameters";

export class DatabaseBootstrap {
  private static appDataSource: DataSource;

  initialize(): Promise<DataSource> {
    const dbConfig: IDatabaseConfig = Parameters.dbConfig;
    const AppDataSource = new DataSource({ type: "mysql", ...dbConfig });

    DatabaseBootstrap.appDataSource = AppDataSource;

    return AppDataSource.initialize();
  }

  static get dataSource(): DataSource {
    return this.appDataSource;
  }

  close() {
    DatabaseBootstrap.appDataSource?.destroy();
  }
}
