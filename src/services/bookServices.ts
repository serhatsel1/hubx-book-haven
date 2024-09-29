import { BookBaseModel as BookBase } from "../models/bookModel";
import {
  createBookSchema,
  deleteBookSchema,
  updateBookSchema,
} from "../schemas/bookValidation";

import {
  CreateBookInput,
  DeleteBookInput,
  UpdateBookInput,
} from "../types/bookTypes";
import { PaginationParams } from "../types/paginationParamsTypes";
import { AuthorBaseModel } from "../models/authorModel";
import { ErrorTypes } from "../errors/errorTypes";
import AppError from "../errors/appError";
import { Types } from "mongoose";

/**
 * Retrieves all books with pagination.
 *
 * @param {PaginationParams} pagination - Pagination parameters (page, limit).
 * @returns {Promise<object>} A promise that resolves to an object containing the list of books, total number of books, total pages, and current page.
 */
export const getAllBooksService = async ({
  page = 1,
  limit = 10,
}: PaginationParams) => {
  const booksCount = await BookBase.countDocuments();

  const books = await BookBase.find()
    .populate("author")
    .skip((page - 1) * limit)
    .limit(limit);

  return {
    success: true,
    data: books,
    totalBooks: booksCount,
    totalPages: Math.ceil(booksCount / limit),
    currentPage: page,
  };
};

/**
 * Creates a new book.
 *
 * @param {CreateBookInput} input - The book data to create.
 * @returns {Promise<object>} A promise that resolves to an object containing the created book data.
 * @throws {AppError} If the input data is invalid or a book with the same title or ISBN already exists.
 */
export const createBookService = async (input: CreateBookInput) => {
  const { error } = createBookSchema.validate(input);

  if (error) {
    throw new AppError({
      message: error.details[0]?.message || "Validation Error",
      status: 400,
    });
  }

  const existingBook = await BookBase.findOne({ title: input.title });

  if (existingBook) {
    throw new AppError(ErrorTypes.ClientErrors.BOOK_ALREADY_EXISTS);
  }

  const existingISBN = await BookBase.findOne({ isbn: input.isbn });

  if (existingISBN) {
    throw new AppError(ErrorTypes.ClientErrors.ISBN_ALREADY_EXISTS);
  }

  const authorProfile = new AuthorBaseModel({
    name: input.author.name,
    country: input.author.country,
    birthDate: new Date(input.author.birthDate),
  });

  await authorProfile.save();

  const book = new BookBase({
    ...input,
    author: authorProfile._id,
  });
  await book.save();

  return { success: true, data: book };
};

/**
 * Updates an existing book.
 *
 * @param {UpdateBookInput} input - The book data to update.
 * @returns {Promise<object>} A promise that resolves to an object containing the updated book data.
 * @throws {AppError} If the input data is invalid or the book is not found.
 */
export const updateBookService = async (input: UpdateBookInput) => {
  const { error } = updateBookSchema.validate(input);

  if (!Types.ObjectId.isValid(input.id)) {
    throw new AppError(ErrorTypes.ClientErrors.BOOK_INVALID_ID);
  }

  const existingBook = await BookBase.findById(input.id);
  if (!existingBook) {
    throw new AppError(ErrorTypes.ClientErrors.BOOK_NOT_FOUND_ID);
  }

  if (error) {
    throw new AppError({
      message: error.details[0]?.message || "Validation Error",
      status: 400,
    });
  }

  const book = await BookBase.findOneAndUpdate({ _id: input.id }, input, {
    new: true,
  });

  if (!book) {
    throw new AppError(ErrorTypes.ClientErrors.BOOK_NOT_FOUND);
  }

  return { success: true, data: book };
};

/**
 * Deletes a book.
 *
 * @param {DeleteBookInput} input - The book id to delete.
 * @returns {Promise<object>} A promise that resolves to an object indicating success or failure.
 * @throws {AppError} If the book is not found.
 */
export const deleteBookService = async (input: DeleteBookInput) => {
  const { id } = input;
  const { error } = deleteBookSchema.validate({ id });

  if (!Types.ObjectId.isValid(input.id)) {
    throw new AppError(ErrorTypes.ClientErrors.BOOK_INVALID_ID);
  }

  const existingBook = await BookBase.findById(input.id);
  if (!existingBook) {
    throw new AppError(ErrorTypes.ClientErrors.BOOK_NOT_FOUND_ID);
  }

  if (error) {
    throw new AppError({
      message: error.details[0]?.message || "Validation Error",
      status: 400,
    });
  }

  const book = await BookBase.findOneAndDelete({ _id: id });

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
