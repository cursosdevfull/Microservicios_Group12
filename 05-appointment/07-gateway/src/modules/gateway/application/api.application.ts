import { inject, injectable } from "inversify";

import { ApiRepository } from "../domain/repositories/api.repository";

@injectable()
export class ApiApplication {
  constructor(
    @inject("ApiRepository") private readonly repository: ApiRepository
  ) {}

  async endpoint(url: string, method: string, data?: any) {
    return await this.repository.requestByType(url, method, data);
  }
}
