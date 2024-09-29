import express, { urlencoded, json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import { indexRouter } from "./routes/indexRouter";

import swaggerDocs from "./utils/swagger";
import log from "./utils/logger";
import { errorHandler } from "./errors/errorHandler";
import DbConnection from "./db/dbConnection";

dotenv.config();

/**
 * Express application instance.
 *
 * Configures middleware for CORS, body parsing, and routing.
 *
 * @type {Express}
 */
const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(urlencoded({ extended: true }));
app.use(json());

swaggerDocs(app, Number(PORT));

app.use(indexRouter);

app.use(
  (error: any, req: express.Request, res: express.Response, next: any) => {
    errorHandler(error, req, res, next);
  }
);
/**
 * Starts the server and sets up Swagger documentation after connecting to the database.
 *
 * Listens for the 'connected' event on the database connection and starts the server on the specified port.
 * Also sets up Swagger documentation for the API.
 */
DbConnection.once("connected", () => {
  log.info("Connected to MongoDB");

  app.listen(PORT, () => {
    log.info(`Server is running on port http://localhost:${PORT}`);
  });
});

/**
 * Handles errors during database connection.
 *
 * Listens for the 'error' event on the database connection and logs the error.
 * Exits the process with an error code if the connection fails.
 */
DbConnection.on("error", (err) => {
  log.error("Error connecting to MongoDB:", err);
  process.exit(1);
});
