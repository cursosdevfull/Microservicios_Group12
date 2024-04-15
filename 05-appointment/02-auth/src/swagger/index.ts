import { Application } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  explorer: true,
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Title Project",
      version: "1.0.0",
      description: "API Description Project",
    },
  },
  apis: ["./src/swagger/docs/*.doc.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app: Application, host: string, port: number) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  console.log(`Swagger is running on http://${host}:${port}/docs`);
};

export { swaggerDocs };
