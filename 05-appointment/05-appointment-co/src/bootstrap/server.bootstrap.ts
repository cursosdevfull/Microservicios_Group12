import { Parameters } from "@core";
import { Application } from "express";
import http from "http";
import { AddressInfo } from "net";

export class ServerBootstrap {
  private instanceServer: http.Server;

  private readonly app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  initialize(): Promise<boolean | NodeJS.ErrnoException> {
    const promise = new Promise<boolean | NodeJS.ErrnoException>(
      (resolve, reject) => {
        const server = http.createServer(this.app);
        const port = Parameters.port;

        server
          .listen(port)
          .on("listening", () => {
            this.instanceServer = server;
            console.log(
              `Server running on port http://${Parameters.hostname}:${
                (server.address() as AddressInfo).port
              }`
            );
            resolve(true);
          })
          .on("error", (error: NodeJS.ErrnoException) => {
            if (error.syscall !== "listen") {
              reject(error);
            }
            switch (error.code) {
              case "EACCES":
                console.error(`Port ${port} requires elevated privileges`);
                process.exit(1);
                break;
              case "EADDRINUSE":
                console.error(`Port ${port} is already in use`);
                process.exit(1);
                break;
              default:
                reject(error);
            }
          });
      }
    );

    return promise;
  }

  getInstanceServer(): http.Server {
    return this.instanceServer;
  }
}
