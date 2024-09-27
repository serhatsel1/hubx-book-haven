import path from "path";
import dotenv from "dotenv";
import mongoose, { Connection } from "mongoose";

dotenv.config({ path: path.join(__dirname, "../", ".env") });

const DbConnection: Connection = mongoose.createConnection(
  process.env.MONGO_DB_URI!
);

export default DbConnection;
