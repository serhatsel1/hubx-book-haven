import dotenv from "dotenv";
import swaggerDocs from "./utils/swagger";
import log from "./utils/logger";
import DbConnection from "./db/DbConnection";
dotenv.config();

import app from "./app";

const PORT = process.env.PORT || 8000;

DbConnection.once("connected", () => {
  console.log("Connected to MongoDB");

  app.listen(PORT, () => {
    log.info(`Server is running on port http://localhost:${process.env.PORT}`);
    swaggerDocs(app, Number(PORT));
  });
});

DbConnection.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err);
  process.exit(1);
});
