import express, { Router } from "express";
import { bookController } from "../controllers/BookController";

const bookRouter: Router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Author:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "John Doe"
 *         country:
 *           type: string
 *           example: "USA"
 *         birthDate:
 *           type: string
 *           format: date
 *           example: "1980-01-01"
 *     Book:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "66f587fb9235e6937f482b5c"
 *         title:
 *           type: string
 *           example: "serhat34"
 *         author:
 *           $ref: '#/components/schemas/Author'
 *         price:
 *           type: number
 *           example: 10
 *         isbn:
 *           type: string
 *           example: "978658822010"
 *         language:
 *           type: string
 *           example: "tr"
 *         numberOfPages:
 *           type: number
 *           example: 12
 *         publisher:
 *           type: string
 *           example: "serhatyaınevleri"
 */
/**
 * @swagger
 * /books:
 *   get:
 *     tags:
 *       - Books
 *     summary: Get all Books
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *   post:
 *     tags:
 *       - Books
 *     summary: Create a new book
 *     description: Create a new book and add it to the database
 *     requestBody:
 *       description: Book object to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Serhat'ın Kitabı"
 *               author:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 *                   country:
 *                     type: string
 *                     example: "USA"
 *                   birthDate:
 *                     type: string
 *                     format: date
 *                     example: "1980-01-01"
 *               price:
 *                 type: number
 *                 example: 10
 *               isbn:
 *                 type: string
 *                 example: "9786588220103"
 *                 description: |
 *                   ISBN number must start with "978" and be either 10 or 13 characters long.
 *                   Valid examples:
 *                   - 9781234567 (10 characters, ISBN-10)
 *                   - 9781234567890 (13 characters, ISBN-13)
 *               language:
 *                 type: string
 *                 example: "tr"
 *               numberOfPages:
 *                 type: number
 *                 example: 12
 *               publisher:
 *                 type: string
 *                 example: "Serhat Yayınları"
 *     responses:
 *       201:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Invalid input
 */

bookRouter.route("/").get(bookController.getAll).post(bookController.create);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     tags:
 *       - Books
 *     summary: Update a single book
 *     description: Update a book by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the book to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Book object with updated fields
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 $ref: '#/components/schemas/Author'
 *               price:
 *                 type: number
 *                 format: float
 *               isbn:
 *                 type: string
 *               language:
 *                 type: string
 *               numberOfPages:
 *                 type: integer
 *               publisher:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not
 *   delete:
 *     tags:
 *       - Books
 *     summary: Delete a single book
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
  .put(bookController.update)
  .delete(bookController.delete);

export { bookRouter };
