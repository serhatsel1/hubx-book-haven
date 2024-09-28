import { Document, Types } from "mongoose";

export interface BookData {
  title: string;
  author: { name: string; country: string; birthDate: string };
  price: number;
  isbn: string;
  language: string;
  numberOfPages: number;
  publisher: string;
}

export interface CreateBookInput {
  title: string;
  author: { name: string; country: string; birthDate: string };
  price: number;
  language: string;
  numberOfPages: number;
  publisher: string;
  isbn: string;
}

// Interface for Book Document
export interface Book extends Document {
  title: string;
  author: Types.ObjectId;
  price: number;
  isbn: string;
  language: string;
  numberOfPages: number;
  publisher: string;
}

// Interface for Author Document

// Interface for Pagination Parameters

// Interface for CreateBookInput
export interface CreateBookInput {
  title: string;
  author: { name: string; country: string; birthDate: string };
  price: number;
  language: string;
  numberOfPages: number;
  publisher: string;
  isbn: string;
}

// Interface for UpdateBookInput
export interface UpdateBookInput {
  id: string;
  title?: string;
  author?: { name: string; country: string; birthDate: string };
  price?: number;
  isbn?: string;
  language?: string;
  numberOfPages?: number;
  publisher?: string;
}

// Interface for DeleteBookInput
export interface DeleteBookInput {
  id: string;
}

export interface IBook extends Document {
  title: string;
  author: Types.ObjectId; // Reference to the Author model
  price: number;
  isbn: string;
  language: string;
  numberOfPages: number;
  publisher: string;
}
