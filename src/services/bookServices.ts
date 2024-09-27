import { Document, Types } from "mongoose";
import CustomError from "../errors/CustomError";
import { ErrorTypes } from "../types/ErrorTypes";
import isbnGenerator from "../utils/isbnGenerator";
import { BookBaseModel as BookBase } from "../models/BookModel";
import { AuthorBaseModel as AuthorBase } from "../models/AuthorModel";
import {
  createBookSchema,
  deleteBookSchema,
  updateBookSchema,
} from "../validations/book-validation";

interface Book extends Document {
  title: string;
  author: string | Types.ObjectId;
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
interface PaginationParams {
  page: number; // Sayfa numarası
  limit: number; // Her sayfadaki öğe sayısı
}
// Get all books service
export const getAllBooksService = async ({
  page = 1,
  limit = 10,
}: PaginationParams) => {
  const booksCount = await BookBase.countDocuments(); // Toplam kitap sayısını al
  const books = await BookBase.find()
    .populate("author")
    .skip((page - 1) * limit) // Atlanan kayıt sayısı
    .limit(limit); // Her sayfadaki kayıt sayısı

  return {
    success: true,
    data: books,
    totalBooks: booksCount, // Toplam kitap sayısı
    totalPages: Math.ceil(booksCount / limit), // Toplam sayfa sayısı
    currentPage: page, // Mevcut sayfa numarası
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
  isbn?: string;
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
  // Joi validasyonunu kullanıyoruz
  const { error } = createBookSchema.validate({
    title,
    author,
    price,
    language,
    numberOfPages,
    publisher,
  });
  if (error) {
    console.error("errors", error);
    throw new CustomError(ErrorTypes.ClientErrors.VALIDATION_ERROR);
  }

  const authorProfile: Author = new AuthorBase({
    name: author.name,
    country: author.country,
    birthDate: new Date(author.birthDate),
  });
  await authorProfile.save();

  const book: Book = new BookBase({
    title,
    author: authorProfile._id, // Author'un ObjectId'sini kaydediyoruz
    price,
    isbn: isbnGenerator.generateISBN13(),
    language,
    numberOfPages,
    publisher,
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
  // Joi validasyonunu kullanıyoruz
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
    console.error("errors", error);
    throw new CustomError(ErrorTypes.ClientErrors.VALIDATION_ERROR);
  }

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
  // Joi validasyonunu kullanıyoruz
  const { error } = deleteBookSchema.validate({ id });
  if (error) {
    console.error("errors", error);
    throw new CustomError(ErrorTypes.ClientErrors.VALIDATION_ERROR);
  }

  const book: Book | null = await BookBase.findOneAndDelete({ _id: id });
  return { success: true, data: book };
};

module.exports = {
  getAllBooksService,
  createBookService,
  updateBookService,
  deleteBookService,
};
