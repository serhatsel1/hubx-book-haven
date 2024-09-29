import { NextFunction, Request, Response } from "express";
import * as bookServices from "../services/bookServices";
import AppError from "../errors/AppError";
import { ErrorTypes } from "../errors/ErrorTypes";
import { bookController } from "../controllers/bookController";

jest.mock("../services/bookServices");

describe("bookController", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
  });

  describe("getAllBooks", () => {
    /**
     * Test case to check if getAllBooks returns all books with pagination successfully.
     * It mocks the getAllBooksService to return a successful response and verifies that
     * the controller calls the service with correct parameters and sends the expected
     * response.
     */
    it("should return all books with pagination", async () => {
      const mockBooks = [
        {
          _id: "1",
          title: "Book 1",
          author: "Author 1",
          price: 10,
          isbn: "1234567890",
          language: "en",
          numberOfPages: 200,
          publisher: "Publisher 1",
        },
        {
          _id: "2",
          title: "Book 2",
          author: "Author 2",
          price: 20,
          isbn: "0987654321",
          language: "tr",
          numberOfPages: 300,
          publisher: "Publisher 2",
        },
      ];
      (bookServices.getAllBooksService as jest.Mock).mockResolvedValue({
        success: true,
        data: mockBooks,
        totalBooks: 2,
        totalPages: 1,
        currentPage: 1,
      });

      mockRequest.query = { page: "1", limit: "10" };

      await bookController.getAll(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(bookServices.getAllBooksService).toHaveBeenCalledWith({
        page: "1",
        limit: "10",
      });
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: mockBooks,
        totalBooks: 2,
        totalPages: 1,
        currentPage: 1,
      });
    });
  });

  describe("create", () => {
    /**
     * Test case to check if createBook successfully creates a new book.
     * It mocks the createBookService to return a successful response and verifies that
     * the controller calls the service with the correct data and sends the expected
     * response with a 201 status code.
     */
    it("should create a book successfully", async () => {
      const bookData = {
        title: "Test Book",
        author: {
          name: "Test Author",
          country: "Test Country",
          birthDate: "1990-01-01",
        },
        isbn: "1234567890",
      };
      const createdBook = { ...bookData, _id: "123" };

      (bookServices.createBookService as jest.Mock).mockResolvedValue({
        success: true,
        data: createdBook,
      });

      mockRequest.body = bookData;

      await bookController.create(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(bookServices.createBookService).toHaveBeenCalledWith(bookData);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: createdBook,
      });
    });

    /**
     * Test case to check if createBook handles validation errors correctly.
     * It mocks the createBookService to throw a validation error and verifies that the
     * controller calls the next middleware with the error.
     */
    it("should handle validation error", async () => {
      const invalidBookData = {};
      const validationError = new AppError({
        message: "Title is required",
        status: 400,
      });

      (bookServices.createBookService as jest.Mock).mockRejectedValue(
        validationError
      );

      mockRequest.body = invalidBookData;

      await bookController.create(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(bookServices.createBookService).toHaveBeenCalledWith(
        invalidBookData
      );
      expect(mockNext).toHaveBeenCalledWith(validationError);
    });

    /**
     * Test case to check if createBook handles "book already exists" errors correctly.
     * It mocks the createBookService to throw a "book already exists" error and verifies that the
     * controller calls the next middleware with the error.
     */
    it("should handle book already exists error", async () => {
      const existingBookData = {
        title: "Existing Book",
        author: {
          name: "Test Author",
          country: "Test Country",
          birthDate: "1990-01-01",
        },
        isbn: "1234567890",
      };
      const bookExistsError = new AppError(
        ErrorTypes.ClientErrors.BOOK_ALREADY_EXISTS
      );

      (bookServices.createBookService as jest.Mock).mockRejectedValue(
        bookExistsError
      );

      mockRequest.body = existingBookData;

      await bookController.create(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(bookServices.createBookService).toHaveBeenCalledWith(
        existingBookData
      );
      expect(mockNext).toHaveBeenCalledWith(bookExistsError);
    });
  });

  describe("update", () => {
    /**
     * Test case to check if updateBook successfully updates a book.
     * It mocks the updateBookService to return a successful response and verifies that
     * the controller calls the service with the correct data and sends the expected
     * response with a 200 status code.
     */
    it("should update a book successfully", async () => {
      const updatedBookData = {
        title: "Updated Book",
        author: {
          name: "Updated Author",
          country: "Updated Country",
          birthDate: "1990-01-01",
        },
      };
      const updatedBook = { _id: "1", ...updatedBookData };
      const successResponse = { success: true, data: updatedBook };

      (bookServices.updateBookService as jest.Mock).mockResolvedValue(
        successResponse
      );

      mockRequest.params = { id: "1" };
      mockRequest.body = updatedBookData;

      await bookController.update(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(bookServices.updateBookService).toHaveBeenCalledWith({
        id: "1",
        ...updatedBookData,
      });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(successResponse);
    });

    /**
     * Test case to check if updateBook handles validation errors correctly.
     * It mocks the updateBookService to throw a validation error and verifies that the
     * controller calls the next middleware with the error.
     */
    it("should handle validation error", async () => {
      const invalidBookData = { title: "" }; // Invalid title
      const validationError = new AppError({
        message: "Title is required",
        status: 400,
      });

      (bookServices.updateBookService as jest.Mock).mockRejectedValue(
        validationError
      );

      mockRequest.params = { id: "1" };
      mockRequest.body = invalidBookData;

      await bookController.update(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(bookServices.updateBookService).toHaveBeenCalledWith({
        id: "1",
        ...invalidBookData,
      });
      expect(mockNext).toHaveBeenCalledWith(validationError);
    });

    /**
     * Test case to check if updateBook handles "book not found" errors correctly.
     * It mocks the updateBookService to throw a "book not found" error and verifies that the
     * controller calls the next middleware with the error.
     */
    it("should handle book not found error", async () => {
      const bookData = { title: "New Title" };
      const notFoundError = new AppError(
        ErrorTypes.ClientErrors.BOOK_NOT_FOUND
      );

      (bookServices.updateBookService as jest.Mock).mockRejectedValue(
        notFoundError
      );

      mockRequest.params = { id: "nonexistent" };
      mockRequest.body = bookData;

      await bookController.update(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(bookServices.updateBookService).toHaveBeenCalledWith({
        id: "nonexistent",
        ...bookData,
      });
      expect(mockNext).toHaveBeenCalledWith(notFoundError);
    });
  });

  describe("delete", () => {
    /**
     * Test case to check if deleteBook successfully deletes a book.
     * It mocks the deleteBookService to return a successful response and verifies that
     * the controller calls the service with the correct ID and sends the expected
     * response.
     */
    it("should delete a book successfully", async () => {
      const deletedBook = {
        _id: "1",
        title: "Deleted Book",
        author: "Deleted Author",
      };
      const successResponse = { success: true, data: deletedBook };

      (bookServices.deleteBookService as jest.Mock).mockResolvedValue(
        successResponse
      );

      mockRequest.params = { id: "1" };

      await bookController.delete(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(bookServices.deleteBookService).toHaveBeenCalledWith({ id: "1" });
      expect(mockResponse.json).toHaveBeenCalledWith(successResponse);
    });

    /**
     * Test case to check if deleteBook handles validation errors correctly.
     * It mocks the deleteBookService to throw a validation error and verifies that the
     * controller calls the next middleware with the error.
     */
    it("should handle validation error", async () => {
      const validationError = new AppError({
        message: "Invalid ID",
        status: 400,
      });

      (bookServices.deleteBookService as jest.Mock).mockRejectedValue(
        validationError
      );

      mockRequest.params = { id: "invalid-id" };

      await bookController.delete(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(bookServices.deleteBookService).toHaveBeenCalledWith({
        id: "invalid-id",
      });
      expect(mockNext).toHaveBeenCalledWith(validationError);
    });

    /**
     * Test case to check if deleteBook handles "book not found" errors correctly.
     * It mocks the deleteBookService to throw a "book not found" error and verifies that the
     * controller calls the next middleware with the error.
     */
    it("should handle book not found error", async () => {
      const notFoundError = new AppError(
        ErrorTypes.ClientErrors.BOOK_NOT_FOUND
      );

      (bookServices.deleteBookService as jest.Mock).mockRejectedValue(
        notFoundError
      );

      mockRequest.params = { id: "nonexistent" };

      await bookController.delete(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(bookServices.deleteBookService).toHaveBeenCalledWith({
        id: "nonexistent",
      });
      expect(mockNext).toHaveBeenCalledWith(notFoundError);
    });
  });
});
