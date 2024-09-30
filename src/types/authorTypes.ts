import { Document } from "mongoose";

export interface IAuthor extends Document {
  name: string;
  country: string;
  birthDate: Date;
}
