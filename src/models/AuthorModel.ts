import { Schema, Model } from "mongoose";
import DbConnection from "../db/DbConnection";
import { IAuthor } from "../types/authorTypes";

/**
 * Mongoose schema for the AuthorBase model.
 * Defines the structure and data types for author documents.
 */
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

/**
 * Mongoose model for the AuthorBase collection.
 * Provides an interface for interacting with author documents in the database.
 */
export const AuthorBaseModel: Model<IAuthor> = DbConnection.model<IAuthor>(
  "AuthorBase",
  AuthorBaseSchema
);
