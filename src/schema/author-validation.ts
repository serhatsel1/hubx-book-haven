import Joi from "joi";

/**
 * Joi schema for validating author data.
 * Ensures the required fields (name, country, birthDate) are present and have the correct format and values.
 */
const authorSchema = Joi.object({
  name: Joi.string()
    .required()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-Z\s]+$/)
    .messages({
      "any.required": "Name is required!",
      "string.empty": "Name cannot be empty!",
      "string.min": "Name must be at least 2 characters long!",
      "string.max": "Name cannot be longer than 50 characters!",
      "string.pattern.base": "Name must contain only letters!",
    }),
  country: Joi.string().required().min(2).max(50).messages({
    "any.required": "Country is required!",
    "string.empty": "Country cannot be empty!",
    "string.min": "Country must be at least 2 characters long!",
    "string.max": "Country cannot be longer than 50 characters!",
  }),
  birthDate: Joi.date().iso().required().max("now").messages({
    "any.required": "Birth date is required!",
    "date.empty": "Birth date cannot be empty!",
    "date.format": "Birth date must be a valid date in ISO 8601 format!",
    "date.max": "Birth date cannot be in the future!",
  }),
}).unknown(false);

export { authorSchema };
