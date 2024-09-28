import { BookBaseModel as BookBase } from "../models/BookModel";
import { AuthorBaseModel as AuthorBase } from "../models/AuthorModel";
import {
  createBookSchema,
  deleteBookSchema,
  updateBookSchema,
} from "../schema/book-validation";
import AppError from "../errors/AppError";
import { ErrorTypes } from "../errors/ErrorTypes";
import {
  Book,
  CreateBookInput,
  DeleteBookInput,
  UpdateBookInput,
} from "../types/bookTypes";
import { PaginationParams } from "../types/paginationParamsTypes";
import { Author } from "../types/authorTypes";

/**
 * Retrieves all books with pagination.
 *
 * @param {PaginationParams} pagination - Pagination parameters (page, limit).
 * @returns {Promise<object>} A promise that resolves to an object containing the list of books, total number of books, total pages, and current page.
 */
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
    currentPage: pageNumber,
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

  const authorProfile: Author = new AuthorBase({
    name: input.author.name,
    country: input.author.country,
    birthDate: new Date(input.author.birthDate),
  });
  await authorProfile.save();

  const book: Book = new BookBase({
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
  if (error) {
    throw new AppError({
      message: error.details[0]?.message || "Validation Error",
      status: 400,
    });
  }

  const book: Book | null = await BookBase.findOneAndUpdate(
    { _id: input.id },
    input,
    { new: true }
  );

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
export const deleteBookService = async ({ id }: DeleteBookInput) => {
  const { error } = deleteBookSchema.validate({ id });
  if (error) {
    throw new AppError({
      message: error.details[0]?.message || "Validation Error",
      status: 400,
    });
  }

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
