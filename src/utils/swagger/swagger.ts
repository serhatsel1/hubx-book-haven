import { Express, Request, Response } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../../../package.json";
import log from "../logger";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "HubX Book Haven API Documentation",
      version,
      description: "API",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`, // Fallback ekledik
      },
    ],
  },
  apis: ["./src/utils/swagger/*.yml"], // swagger klasörünün tam yolu
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app: Express, port: number) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  log.info(`Swagger.json is ready at http://localhost:${port}/api-docs`);
}

export default swaggerDocs;
