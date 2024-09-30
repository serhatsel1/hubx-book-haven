import mongoose, { Schema } from "mongoose";
import DbConnection from "../db/dbConnection";
import { BookData } from "../types/bookTypes";

/**
 * Mongoose schema for the BookBase model.
 * Defines the structure and data types for book documents.
 */
const BookBaseSchema = new Schema<BookData>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: mongoose.Schema.Types.Mixed,
      ref: "AuthorBase",
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
export const BookBaseModel = DbConnection.model<BookData>(
  "BookBase",
  BookBaseSchema
);
