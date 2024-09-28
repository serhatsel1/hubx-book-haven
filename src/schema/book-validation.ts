import Joi from "joi";
import { authorSchema } from "./author-validation";
/**
 * @swagger
 * components:
 *   schema:
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

// Create Book Schema
const createBookSchema = Joi.object({
  title: Joi.string().required(),
  author: authorSchema.required(),
  price: Joi.number().min(0).required(),
  language: Joi.string().required(),
  numberOfPages: Joi.number().integer().min(1).required(),
  isbn: Joi.string()
    .pattern(/^(?:\d{9}[\dX]|\d{13})$/)
    .messages({
      "string.pattern.base":
        "ISBN must be either 9 digits followed by 10 or 13 digits.",
    }),
  publisher: Joi.string().required(),
}).unknown(false);

// Update Book Schema
const updateBookSchema = Joi.object({
  id: Joi.string().required(),
  title: Joi.string(),
  author: authorSchema,
  price: Joi.number().min(0),
  isbn: Joi.string().pattern(/^(?:\d{9}[\dX]|\d{13})$/),
  language: Joi.string(),
  numberOfPages: Joi.number().integer().min(1),
  publisher: Joi.string(),
}).unknown(false);

// Delete Book Schema
const deleteBookSchema = Joi.object({
  id: Joi.string().required(),
}).unknown(false);

export { createBookSchema, updateBookSchema, deleteBookSchema };
