import { Document } from "mongoose";

export interface Author extends Document {
  name: string;
  country: string;
  birthDate: Date;
}
export interface IAuthor extends Document {
  name: string;
  country: string;
  birthDate: Date;
}
