import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import {
  getAllBooksService,
  createBookService,
  updateBookService,
  deleteBookService,
} from "../services/bookServices";

// Define an interface for the expected book data shape
interface BookData {
  title: string;
  author: { name: string; country: string; birthDate: string };
  price: number;
  isbn: string;
  language: string;
  numberOfPages: number;
  publisher: string;
}

export class BookController {
  // Get all books
  static getAllBooks = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { page = "1", limit = "10" } = req.query as {
        page?: string;
        limit?: string;
      };
    
      const response = await getAllBooksService({
        page: page,
        limit: limit,
      });
      res.json(response);
    }
  );

  // Create a new book
  static createBook = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const {
        title,
        author,
        price,
        isbn,
        language,
        numberOfPages,
        publisher,
      }: BookData = req.body;

      const response = await createBookService({
        title,
        author,
        price,
        isbn,
        language,
        numberOfPages,
        publisher,
      });
      res.json(response);
    }
  );

  // Update an existing book
  static updateBook = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const {
        title,
        author,
        price,
        isbn,
        language,
        numberOfPages,
        publisher,
      }: BookData = req.body;

      const response = await updateBookService({
        id,
        title,
        author,
        price,
        isbn,
        language,
        numberOfPages,
        publisher,
      });
      res.json(response);
    }
  );

  // Delete a book
  static deleteBook = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const response = await deleteBookService({ id });
      res.json(response);
    }
  );
}

module.exports.BookController = BookController;
