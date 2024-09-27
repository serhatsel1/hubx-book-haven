import Joi from "joi";
import { authorSchema } from "./author-validation";

// Create Book Schema
const createBookSchema = Joi.object({
  title: Joi.string().required(),
  author: authorSchema.required(),
  price: Joi.number().min(0).required(),
  language: Joi.string().required(),
  numberOfPages: Joi.number().integer().min(1).required(),
  publisher: Joi.string().required(),
});

// Update Book Schema
const updateBookSchema = Joi.object({
  id: Joi.string().required(),
  title: Joi.string(),
  author: authorSchema,
  price: Joi.number().min(0),
  isbn: Joi.string(),
  language: Joi.string(),
  numberOfPages: Joi.number().integer().min(1),
  publisher: Joi.string(),
});

// Delete Book Schema
const deleteBookSchema = Joi.object({
  id: Joi.string().required(),
});

export { createBookSchema, updateBookSchema, deleteBookSchema };
