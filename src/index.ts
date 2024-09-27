import express, { urlencoded, json } from "express";
import dotenv from "dotenv";
import DbConnection from "./db/DbConnection";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({ origin: "*", credentials: true }));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(urlencoded({ extended: true }));
app.use(json());

app.use("/", (req, res) => {
  res.status(200).json({ msg: "Server is up and running" });
});

DbConnection.once("connected", () => {
  console.log("Connected to MongoDB");

  app.listen(port, () => {
    console.log(
      `Server is running on port http://localhost:${process.env.PORT}`
    );
  });
});

DbConnection.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err);
  process.exit(1);
});
