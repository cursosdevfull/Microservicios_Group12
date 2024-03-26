import { UserApplication } from "@user/application";
import { UserRepository } from "@user/domain";
import { UserInfrastructure } from "@user/infrastructure";
import { UserController } from "@user/presentation";
import { Container } from "inversify";

const container = new Container();
container.bind<UserRepository>("UserRepository").to(UserInfrastructure);
container.bind<UserApplication>("UserApplication").to(UserApplication);
container.bind<UserController>("UserController").to(UserController);

//console.log("container initialize", container);

export { container };
