import "reflect-metadata";

import http from "http";

import { app } from "./app";

const server = http.createServer(app);

server.listen(3000, () => console.log("Server running on port 3000"));

/* (async () => {
  const user = new User({
    name: "Marcela",
    lastname: "Nieto",
    email: "marcela@company.com",
    password: "12345",
    refreshToken: "339c003e-1df2-48f6-b633-36e1d3444c40",
    positionJobs: [new PositionJob("TI", "developer frontend", 2021)],
  }); */

/*   const repository: UserRepository = new UserInfrastructure();
  const application: UserApplication = new UserApplication(repository); */
/*   const application: UserApplication = container.get("UserApplication");
  const userCreated = await application.create(user);
  console.log(userCreated); */
//})();
