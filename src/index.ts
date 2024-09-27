import express, { urlencoded, json } from "express";
import dotenv from "dotenv";
import DbConnection from "./db/DbConnection";
import cors from "cors";
import bodyParser from "body-parser";

import { indexRouter } from "./routes/indexRouter";

import swaggerDocs from "./utils/swagger";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({ origin: "*", credentials: true }));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(urlencoded({ extended: true }));
app.use(json());

app.use(indexRouter);

DbConnection.once("connected", () => {
  console.log("Connected to MongoDB");

  app.listen(port, () => {
    console.log(
      `Server is running on port http://localhost:${process.env.PORT}`
    );
    swaggerDocs(app, Number(port));
  });
});

DbConnection.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err);
  process.exit(1);
});
