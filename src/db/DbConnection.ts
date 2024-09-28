import path from "path";
import dotenv from "dotenv";
import mongoose, { Connection } from "mongoose";

dotenv.config({ path: path.join(__dirname, "../", ".env") });

/**
 * Creates a connection to the MongoDB database.
 *
 * @returns {Connection} A MongoDB connection object.
 */
const DbConnection: Connection = mongoose.createConnection(
  process.env.MONGO_DB_URI!
);

export default DbConnection;
