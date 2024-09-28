import mongoose, { Schema, Model } from "mongoose";
import DbConnection from "../db/DbConnection"; // Assuming you have this connection defined
import { IBook } from "../types/bookTypes";

/**
 * Mongoose schema for the BookBase model.
 * Defines the structure and data types for book documents.
 */
const BookBaseSchema: Schema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
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
  },
  { versionKey: false }
);

/**
 * Mongoose model for the BookBase collection.
 * Provides an interface for interacting with book documents in the database.
 */
export const BookBaseModel: Model<IBook> = DbConnection.model<IBook>(
  "BookBase",
  BookBaseSchema
);
