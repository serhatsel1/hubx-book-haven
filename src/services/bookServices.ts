import { Document, Types } from "mongoose";
import CustomError from "../errors/CustomError";
import { ErrorTypes } from "../types/ErrorTypes";
import isbnGenerator from "../utils/isbnGenerator";
import { BookBaseModel as BookBase } from "../models/BookModel";

import { AuthorBaseModel as AuthorBase } from "../models/AuthorModel";

// Define interfaces for your Book and Author models (adjust these based on your actual schema)
interface Book extends Document {
  title: string;
  author: string | Types.ObjectId; // Allow author to be either a string or an ObjectId
  price: number;
  isbn: string;
  language: string;
  numberOfPages: number;
  publisher: string;
}

interface Author extends Document {
  name: string;
  country: string;
  birthDate: Date;
}

// Get all books service
export const getAllBooksService = async () => {
  const books: Book[] = await BookBase.find().populate("author");
  return { success: true, data: books };
};

// Interface for createBookService input
interface CreateBookInput {
  title: string;
  author: { name: string; country: string; birthDate: string }; // Adjust based on your author input structure
  price: number;
  language: string;
  numberOfPages: number;
  publisher: string;
  isbn: string;
}

// Create a new book service
export const createBookService = async ({
  title,
  author,
  price,
  language,
  numberOfPages,
  publisher,
}: CreateBookInput) => {
  const authorProfile: Author = new AuthorBase({
    name: author.name,
    country: author.country,
    birthDate: new Date(author.birthDate),
  });
  await authorProfile.save();

  const book: Book = new BookBase({
    title,
    author: authorProfile._id, // Assuming you're storing the author's ObjectId in the book
    price,
    isbn: isbnGenerator.generateISBN13(),
    language,
    numberOfPages,
    publisher,
  });

  // Optional: Check for duplicate title (uncomment if needed)
  // if (title === (await BookBase.findOne({ title })).title) {
  //   throw new CustomError({
  //     status: 400,
  //     message: "ErrorTypes.ClientErrors.DUPLICATE_VALUE",
  //   });
  // }

  if (price < 0) {
    throw new CustomError(ErrorTypes.ClientErrors.NEGATIVE_VALUE);
  }

  await book.save();
  return { success: true, data: book };
};

// Interface for updateBookService input
interface UpdateBookInput {
  id: string; // Or the appropriate type for your book ID
  title?: string;
  author?: { name: string; country: string; birthDate: string }; // Adjust if needed
  price?: number;
  isbn?: string;
  language?: string;
  numberOfPages?: number;
  publisher?: string;
}

// Update an existing book service
export const updateBookService = async ({
  id,
  title,
  author,
  price,
  isbn,
  language,
  numberOfPages,
  publisher,
}: UpdateBookInput) => {
  const book: Book | null = await BookBase.findOneAndUpdate(
    { _id: id },
    { title, author, price, isbn, language, numberOfPages, publisher },
    { new: true }
  );

  return { success: true, data: book };
};

// Interface for deleteBookService input
interface DeleteBookInput {
  id: string; // Or the appropriate type for your book ID
}

// Delete a book service
export const deleteBookService = async ({ id }: DeleteBookInput) => {
  const book: Book | null = await BookBase.findOneAndDelete({ _id: id });
  return { success: true, data: book };
};

module.exports = {
  getAllBooksService,
  createBookService,
  updateBookService,
  deleteBookService,
};
