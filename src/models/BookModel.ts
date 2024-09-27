import mongoose, { Schema, Model, Document, Types } from "mongoose";
import DbConnection from "../db/DbConnection"; // Assuming you have this connection defined

// Define an interface to represent the shape of your Book documents
interface IBook extends Document {
  title: string;
  author: Types.ObjectId; // Reference to the Author model
  price: number;
  isbn: string;
  language: string;
  numberOfPages: number;
  publisher: string;
}

// Create the Mongoose schema based on the interface
const BookBaseSchema: Schema = new Schema<IBook>({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AuthorBase", // Reference to the Author model
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
  },
  language: {
    type: String,
    required: true,
  },
  numberOfPages: {
    type: Number,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
});

// Create the Mongoose model using the schema and the existing database connection
const BookBaseModel: Model<IBook> = DbConnection.model<IBook>(
  "BookBase",
  BookBaseSchema
);

export { BookBaseModel };
