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
export const getAllBooksService = async ({ page, limit }: PaginationParams) => {
  const booksCount = await BookBase.countDocuments();

  const books = await BookBase.find()
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
 * @param {CreateBookInput} bookData - The book data to create.
 * @returns {Promise<object>} A promise that resolves to an object containing the created book data.
 * @throws {AppError} If the bookData data is invalid or a book with the same title or ISBN already exists.
 */
export const createBookService = async (bookData: CreateBookInput) => {
  const { error } = createBookSchema.validate(bookData);

  if (error) {
    throw new AppError({
      message: error.details[0]?.message || "Validation Error",
      status: 400,
    });
  }

  const existingBook = await BookBase.findOne({ title: bookData.title });

  if (existingBook) {
    throw new AppError(ErrorTypes.ClientErrors.BOOK_ALREADY_EXISTS);
  }

  const existingISBN = await BookBase.findOne({ isbn: bookData.isbn });

  if (existingISBN) {
    throw new AppError(ErrorTypes.ClientErrors.ISBN_ALREADY_EXISTS);
  }
  //@@@@@
  const authorProfile = new AuthorBaseModel({
    name: bookData.author.name,
    country: bookData.author.country,
    birthDate: new Date(bookData.author.birthDate),
  });

  await authorProfile.save();

  const book = new BookBase({
    ...bookData,
    author: authorProfile._id,
  });
  await book.save();

  const populatedBook = await BookBase.findById(book._id).populate("author");

  return { success: true, data: populatedBook };
};

/**
 * Updates an existing book.
 *
 * @param {UpdateBookInput} bookData - The book data to update.
 * @returns {Promise<object>} A promise that resolves to an object containing the updated book data.
 * @throws {AppError} If the bookData data is invalid or the book is not found.
 */
export const updateBookService = async (bookData: UpdateBookInput) => {
  if (!Types.ObjectId.isValid(bookData.id)) {
    throw new AppError(ErrorTypes.ClientErrors.BOOK_INVALID_ID);
  }

  const existingBook = await BookBase.findById(bookData.id);
  if (!existingBook) {
    throw new AppError(ErrorTypes.ClientErrors.BOOK_NOT_FOUND_ID);
  }

  const existingBookWithSameTitle = await BookBase.exists({
    _id: { $ne: bookData.id },
    title: bookData.title,
  });

  if (existingBookWithSameTitle) {
    throw new AppError(ErrorTypes.ClientErrors.BOOK_ALREADY_EXISTS);
  }

  const { error } = updateBookSchema.validate(bookData);

  if (error) {
    throw new AppError({
      message: error.details[0]?.message || "Validation Error",
      status: 400,
    });
  }

  const book = await BookBase.findOneAndUpdate({ _id: bookData.id }, bookData, {
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
 * @param {DeleteBookInput} bookData - The book id to delete.
 * @returns {Promise<object>} A promise that resolves to an object indicating success or failure.
 * @throws {AppError} If the book is not found.
 */
export const deleteBookService = async (bookData: DeleteBookInput) => {
  const { id } = bookData;
  const { error } = deleteBookSchema.validate({ id });

  console.log("id", id);
  //@@@@
  if (!Types.ObjectId.isValid(bookData.id)) {
    throw new AppError(ErrorTypes.ClientErrors.BOOK_INVALID_ID);
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
