import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import {
  getAllBooksService,
  createBookService,
  updateBookService,
  deleteBookService,
} from "../services/bookServices";
import { BookData } from "../types/bookTypes";

export class BookController {
  /**
   * Get all books with pagination.
   *
   * @param req - Express request object. Includes query parameters for page and limit.
   * @param res - Express response object. Sends a JSON response containing the list of books,
   *              total number of books, total pages, and current page.
   *
   * @example
   *  - `GET /books` - Returns the first 10 books.
   *  - `GET /books?page=2&limit=5` - Returns 5 books from page 2.
   *
   * @returns
   *  - `200 OK` with a JSON response on success.
   *  - `500 Internal Server Error` if an unexpected error occurs.
   */
  static getAll = expressAsyncHandler(async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;

    const response = await getAllBooksService({
      page: parseInt(page as string),
      limit: parseInt(limit as string),
    });

    res.status(200).json(response);
  });

  /**
   * Create a new book.
   *
   * @param req - Express request object. Contains the book data in the request body.
   * @param res - Express response object. Sends a JSON response indicating success or failure.
   *
   * @example
   *  - `POST /books` with a JSON payload in the request body.
   *
   * @returns
   *  - `201 Created` with the created book data on success.
   *  - `400 Bad Request` if the book data is invalid or a book with the same title already exists.
   *  - `500 Internal Server Error` if an unexpected error occurs.
   */
  static create = expressAsyncHandler(async (req: Request, res: Response) => {
    const bookData: BookData = req.body;

    const response = await createBookService(bookData);

    res.status(201).json(response);
  });

  /**
   * Update an existing book.
   *
   * @param req - Express request object. Contains the book id in the request parameters and the updated book data in the request body.
   * @param res - Express response object. Sends a JSON response indicating success or failure.
   *
   * @example
   *  - `PUT /books/:id` with a JSON payload in the request body.
   *
   * @returns
   *  - `200 OK` with the updated book data on success.
   *  - `400 Bad Request` if the book data is invalid.
   *  - `404 Not Found` if the book with the given id is not found.
   *  - `500 Internal Server Error` if an unexpected error occurs.
   */
  static update = expressAsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const bookData: BookData = req.body;

    const response = await updateBookService({ id, ...bookData });

    res.status(200).json(response);
  });

  /**
   * Delete a book.
   *
   * @param req - Express request object. Contains the book id in the request parameters.
   * @param res - Express response object. Sends a JSON response indicating success or failure.
   *
   * @example
   *  - `DELETE /books/:id`.
   *
   * @returns
   *  - `200 OK` on successful deletion.
   *  - `404 Not Found` if the book with the given id is not found.
   *  - `500 Internal Server Error` if an unexpected error occurs.
   */
  static delete = expressAsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const response = await deleteBookService({ id });

    res.json(response);
  });
}

module.exports.BookController = BookController;
