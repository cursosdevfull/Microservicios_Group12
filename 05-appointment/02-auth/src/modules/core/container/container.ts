import { AuthApplication, AuthInfrastructure } from "@auth";
import { Container } from "inversify";

import { AuthRepository } from "../../auth/domain/repositories/auth.repository";
import { Http } from "../../auth/infrastructure/adapters/http";
import { HttpRepository } from "../../auth/infrastructure/adapters/http.repository";
import { AuthController } from "../../auth/presentation/auth.controller";

const container = new Container();
container.bind<AuthController>("AuthController").to(AuthController);
container.bind<AuthApplication>("AuthApplication").to(AuthApplication);
container.bind<AuthRepository>("AuthRepository").to(AuthInfrastructure);
container.bind<HttpRepository>("HttpRepository").to(Http);

//console.log("container initialize", container);

export { container };
