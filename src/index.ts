import express, { urlencoded, json } from "express";
import dotenv from "dotenv";
import DbConnection from "./db/DbConnection";
import cors from "cors";
import bodyParser from "body-parser";

import { indexRouter } from "./routes/indexRouter";

import swaggerDocs from "./utils/swagger";

dotenv.config();

/**
 * Express application instance.
 *
 * Configures middleware for CORS, body parsing, and routing.
 *
 * @type {Express}
 */
const app = express();
const port = process.env.PORT || 8000;

app.use(cors({ origin: "*", credentials: true }));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(urlencoded({ extended: true }));
app.use(json());

app.use(indexRouter);

/**
 * Starts the server and sets up Swagger documentation after connecting to the database.
 *
 * Listens for the 'connected' event on the database connection and starts the server on the specified port.
 * Also sets up Swagger documentation for the API.
 */
DbConnection.once("connected", () => {
  console.log("Connected to MongoDB");

  app.listen(port, () => {
    console.log(
      `Server is running on port http://localhost:${process.env.PORT}`
    );
    swaggerDocs(app, Number(port));
  });
});

/**
 * Handles errors during database connection.
 *
 * Listens for the 'error' event on the database connection and logs the error.
 * Exits the process with an error code if the connection fails.
 */
DbConnection.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err);
  process.exit(1);
});
