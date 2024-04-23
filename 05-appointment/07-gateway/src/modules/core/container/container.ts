import { Container } from "inversify";

import { ApiApplication } from "../../gateway/application/api.application";
import { ApiRepository } from "../../gateway/domain/repositories/api.repository";
import { ApiInfrastructure } from "../../gateway/infrastructure/api.infrastructure";
import { ApiController } from "../../gateway/presentation/api.controller";

const container = new Container();
container.bind<ApiController>("ApiController").to(ApiController);
container.bind<ApiApplication>("ApiApplication").to(ApiApplication);
container.bind<ApiRepository>("ApiRepository").to(ApiInfrastructure);

//console.log("container initialize", container);

export { container };
