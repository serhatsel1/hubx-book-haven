import mongoose, { Connection } from "mongoose";

const MONGO_DB_URI =
  process.env.MONGO_DB_URI || "mongodb://mongodb:27018/hubxCollection";
console.log(process.env.MONGO_DB_URI, "process.env.MONGO_DB_URI");
/**
 * Creates a connection to the MongoDB database.
 *
 * @returns {Connection} A MongoDB connection object.
 */
const DbConnection: Connection = mongoose.createConnection(MONGO_DB_URI!);

export default DbConnection;
