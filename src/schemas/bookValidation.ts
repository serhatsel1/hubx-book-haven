import Joi from "joi";
import { authorSchema } from "./authorValidation";

/**
 * @swagger
 * components:
 *   schemas:
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
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: "66f587fb9235e6937f482b5a"
 *             name:
 *               type: string
 *               example: "serhat"
 *             country:
 *               type: string
 *               example: "turkey"
 *             birthDate:
 *               type: string
 *               format: date-time
 *               example: "2010-10-09T21:00:00.000Z"
 *             __v:
 *               type: number
 *               example: 0
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
 *         __v:
 *           type: number
 *           example: 0
 */

/**
 * Joi schema for validating book data during creation.
 * Ensures all required fields are present and have the correct data types.
 */
const createBookSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Title is required!",
    "string.empty": "Title cannot be empty!",
  }),
  author: authorSchema.required().messages({
    "any.required": "Author is required!",
  }),
  price: Joi.number().min(0).required().messages({
    "any.required": "Price is required!",
    "number.min": "Price must be greater than or equal to 0!",
  }),
  language: Joi.string().required().messages({
    "any.required": "Language is required!",
    "string.empty": "Language cannot be empty!",
  }),
  numberOfPages: Joi.number().integer().min(1).required().messages({
    "any.required": "Number of pages is required!",
    "number.integer": "Number of pages must be an integer!",
    "number.min": "Number of pages must be greater than or equal to 1!",
  }),
  isbn: Joi.string()
    .pattern(/^(?:\d{9}[\dX]|\d{13})$/)
    .messages({
      "string.pattern.base":
        "ISBN must be either 9 digits followed by 10 or 13 digits.",
    }),
  publisher: Joi.string().required().messages({
    "any.required": "Publisher is required!",
    "string.empty": "Publisher cannot be empty!",
  }),
}).unknown(false);

/**
 * Joi schema for validating book data during update.
 * Allows for partial updates and ensures the provided fields have the correct data types.
 */
const updateBookSchema = Joi.object({
  _id: Joi.string().required().messages({
    "any.required": "Book ID is required!",
    "string.empty": "Book ID cannot be empty!",
  }),
  title: Joi.string(),
  author: authorSchema,
  price: Joi.number().min(0),
  isbn: Joi.string().pattern(/^(?:\d{9}[\dX]|\d{13})$/),
  language: Joi.string(),
  numberOfPages: Joi.number().integer().min(1),
  publisher: Joi.string(),
}).unknown(false);

/**
 * Joi schema for validating book data during deletion.
 * Ensures only the book id is provided.
 */
const deleteBookSchema = Joi.object({
  _id: Joi.string().required().messages({
    "any.required": "Book ID is required!",
    "string.empty": "Book ID cannot be empty!",
  }),
}).unknown(false);

export { createBookSchema, updateBookSchema, deleteBookSchema };
