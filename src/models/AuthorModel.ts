import { Schema, Model, Document } from "mongoose";
import DbConnection from "../db/DbConnection"; // Assuming you have this connection defined

// Define an interface to represent the shape of your Author documents
interface IAuthor extends Document {
  name: string;
  country: string;
  birthDate: Date;
}

// Create the Mongoose schema based on the interface
const AuthorBaseSchema: Schema = new Schema<IAuthor>(
  {
    name: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
  },
  { versionKey: false }
);

// Create the Mongoose model using the schema and the existing database connection
const AuthorBaseModel: Model<IAuthor> = DbConnection.model<IAuthor>(
  "AuthorBase",
  AuthorBaseSchema
);

export { AuthorBaseModel };
