import { Document, Types } from "mongoose";
import { BookBaseModel as BookBase } from "../models/BookModel";
import { AuthorBaseModel as AuthorBase } from "../models/AuthorModel";
import {
  createBookSchema,
  deleteBookSchema,
  updateBookSchema,
} from "../schema/book-validation";
import AppError from "../errors/AppError";
import { ErrorTypes } from "../types/ErrorTypes";

// Interface for Book Document
interface Book extends Document {
  title: string;
  author: Types.ObjectId;
  price: number;
  isbn: string;
  language: string;
  numberOfPages: number;
  publisher: string;
}

// Interface for Author Document
interface Author extends Document {
  name: string;
  country: string;
  birthDate: Date;
}

// Interface for Pagination Parameters
interface PaginationParams {
  page: string;
  limit: string;
}

// Get all books service
export const getAllBooksService = async ({
  page = "1",
  limit = "10",
}: PaginationParams) => {
  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);

  const booksCount = await BookBase.countDocuments();
  const books = await BookBase.find()
    .populate("author")
    .skip((pageNumber - 1) * limitNumber)
    .limit(limitNumber);

  return {
    success: true,
    data: books,
    totalBooks: booksCount,
    totalPages: Math.ceil(booksCount / limitNumber),
    currentPage: page,
  };
};

// Create a new book service
interface CreateBookInput {
  title: string;
  author: { name: string; country: string; birthDate: string };
  price: number;
  language: string;
  numberOfPages: number;
  publisher: string;
  isbn: string;
}

export const createBookService = async (input: CreateBookInput) => {
  // Validate input using Joi
  const { error } = createBookSchema.validate({ ...input });
  if (error) {
    console.log("asdasd", error);
    console.log("asdasd", error._original);

    throw new AppError({
      message: error?.details[0]?.message || "Validation Error",
      status: 400,
    });
  }

  const existingBook = await BookBase.findOne({ title: input.title });
  const existingISBN = await BookBase.findOne({ isbn: input.isbn });
  if (existingBook) {
    throw new AppError(ErrorTypes.ClientErrors.BOOK_ALREADY_EXISTS);
  }
  if (existingISBN) {
    throw new AppError(ErrorTypes.ClientErrors.ISBN_ALREADY_EXISTS);
  }

  // Create a new author profile
  const authorProfile: Author = new AuthorBase({
    name: input.author.name,
    country: input.author.country,
    birthDate: new Date(input.author.birthDate),
  });
  await authorProfile.save();

  // Create a new book
  const book: Book = new BookBase({
    title: input.title,
    author: authorProfile._id,
    price: input.price,
    isbn: input.isbn,
    language: input.language,
    numberOfPages: input.numberOfPages,
    publisher: input.publisher,
  });
  await book.save();

  return { success: true, data: book };
};

// Update an existing book service
interface UpdateBookInput {
  id: string;
  title?: string;
  author?: { name: string; country: string; birthDate: string };
  price?: number;
  isbn?: string;
  language?: string;
  numberOfPages?: number;
  publisher?: string;
}

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
  // Validate input using Joi
  const { error } = updateBookSchema.validate({
    id,
    title,
    author,
    price,
    isbn,
    language,
    numberOfPages,
    publisher,
  });

  if (error) {
    throw new AppError({
      message: error?.details[0]?.message || "Validation Error",
      status: 400,
    });
  }

  // Update the book in the database
  const book: Book | null = await BookBase.findOneAndUpdate(
    { _id: id },
    { title, author, price, isbn, language, numberOfPages, publisher },
    { new: true }
  );

  if (!book) {
    throw new AppError(ErrorTypes.ClientErrors.BOOK_NOT_FOUND);
  }

  return { success: true, data: book };
};

// Delete a book service
interface DeleteBookInput {
  id: string;
}

export const deleteBookService = async ({ id }: DeleteBookInput) => {
  // Validate input using Joi
  const { error } = deleteBookSchema.validate({ id });
  if (error) {
    throw new AppError({
      message: error?.details[0]?.message || "Validation Error",
      status: 400,
    });
  }

  // Delete the book from the database
  const book: Book | null = await BookBase.findOneAndDelete({ _id: id });

  if (!book) {
    throw new AppError(ErrorTypes.ClientErrors.BOOK_NOT_FOUND);
  }

  return { success: true, data: book };
};

// Exporting services
export default {
  getAllBooksService,
  createBookService,
  updateBookService,
  deleteBookService,
};
