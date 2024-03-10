import { Auth, AuthApplication, AuthInfrastructure } from "@auth";
import {
  BrokerBootstrap,
  CacheBootstrap,
  DatabaseBootstrap,
  ServerBootstrap,
} from "@bootstrap";

const auth = new Auth("email@email.com", "password");
const authApplication = new AuthApplication("email@email.com", "password");
const authInfrastructure = new AuthInfrastructure(
  "email@email.com",
  "password"
);

const server = new ServerBootstrap();
const database = new DatabaseBootstrap();
const cache = new CacheBootstrap();
const broker = new BrokerBootstrap();

console.log("prueba");
