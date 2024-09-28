import express, { urlencoded, json } from "express";
import dotenv from "dotenv";
import DbConnection from "./db/DbConnection";
import cors from "cors";
import bodyParser from "body-parser";

import { indexRouter } from "./routes/indexRouter";

import swaggerDocs from "./utils/swagger";
import ErrorHandler from "./errors/ErrorHandler";
import log from "./utils/logger";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({ origin: "*", credentials: true }));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(urlencoded({ extended: true }));
app.use(json());

app.use(indexRouter);
app.use(ErrorHandler);

DbConnection.once("connected", () => {
  log.info("Connected to MongoDB");

  app.listen(port, () => {
    log.info(`Server is running on port http://localhost:${process.env.PORT}`);
    swaggerDocs(app, Number(port));
  });
});

DbConnection.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err);
  process.exit(1);
});
