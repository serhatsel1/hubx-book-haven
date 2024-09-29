import { Schema } from "mongoose";
import { IAuthor } from "../types/authorTypes";
import DbConnection from "../db/dbConnection";

/**
 * Mongoose schema for the AuthorBase model.
 * Defines the structure and data types for author documents.
 */
const AuthorBaseSchema = new Schema<IAuthor>(
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

/**
 * Mongoose model for the AuthorBase collection.
 * Provides an interface for interacting with author documents in the database.
 */
export const AuthorBaseModel = DbConnection.model<IAuthor>(
  "AuthorBase",
  AuthorBaseSchema
);
