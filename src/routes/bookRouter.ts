import express, { Router } from "express";
import { BookController } from "../controllers/BookController";

const bookRouter: Router = express.Router();

/**
 * @openapi
 * /books:
 *   get:
 *     tags:
 *       - Books
 *     description: Get all books with pagination
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         description: Page number to retrieve
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         required: false
 *         description: Number of books per page
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Success
 *   post:
 *     tags:
 *       - Books
 *     description: Create a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               isbn:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 */
bookRouter
  .route("/")
  .get(BookController.getAllBooks)
  .post(BookController.createBook);

/**
 * @openapi
 * /books/{id}:
 *   put:
 *     tags:
 *       - Books
 *     description: Update a book by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the book to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *   delete:
 *     tags:
 *       - Books
 *     description: Delete a book by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the book to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted successfully
 */
bookRouter
  .route("/:id")
  .put(BookController.updateBook)
  .delete(BookController.deleteBook);

export { bookRouter };
