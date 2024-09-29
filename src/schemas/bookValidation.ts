import Joi from "joi";
import { authorSchema } from "./authorValidation";

/**
 * Joi schema for validating book data during creation.
 * Ensures all required fields are present and have the correct data types.
 */
const createBookSchema = Joi.object({
  title: Joi.string().required().min(2).max(100).messages({
    "any.required": "Title is required!",
    "string.empty": "Title cannot be empty!",
  }),
  numberOfPages: Joi.number().required().integer().min(1),
  author: authorSchema.required().messages({
    "any.required": "Author is required!",
  }),
  price: Joi.number().min(0).required().messages({
    "any.required": "Price is required!",
    "number.min": "Price must be greater than or equal to 0!",
  }),
  language: Joi.string().min(2).max(100).required().messages({
    "any.required": "Language is required!",
    "string.empty": "Language cannot be empty!",
  }),
  isbn: Joi.string()
    .pattern(/^(?:\d{9}[\dX]|\d{13})$/)
    .messages({
      "string.pattern.base":
        "ISBN must be either 9 digits followed by 10 or 13 digits.",
    }),
  publisher: Joi.string().min(2).max(100).required().messages({
    "any.required": "Publisher is required!",
    "string.empty": "Publisher cannot be empty!",
  }),
}).unknown(false);

/**
 * Joi schema for validating book data during update.
 * Allows for partial updates and ensures the provided fields have the correct data types.
 */
const updateBookSchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "Book ID is required!",
    "string.empty": "Book ID cannot be empty!",
  }),
  title: Joi.string(),
  author: authorSchema,
  price: Joi.number().min(0),
  isbn: Joi.string()
    .pattern(/^(?:\d{9}[\dX]|\d{13})$/)
    .messages({
      "string.pattern.base":
        "ISBN must be either 9 digits followed by 10 or 13 digits.",
    }),
  language: Joi.string(),
  numberOfPages: Joi.number().required().integer().min(1),
  publisher: Joi.string(),
}).unknown(false);

/**
 * Joi schema for validating book data during deletion.
 * Ensures only the book id is provided.
 */
const deleteBookSchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "Book ID is required!",
    "string.empty": "Book ID cannot be empty!",
  }),
}).unknown(false);

export { createBookSchema, updateBookSchema, deleteBookSchema };
