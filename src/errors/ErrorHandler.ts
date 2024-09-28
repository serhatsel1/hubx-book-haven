import { Request, Response, NextFunction } from "express";
import AppError from "./AppError";

/**
 * Express middleware for handling errors.
 *
 * @param {any} error - The error object.
 * @param {Response} res - Express response object.
 *
 * @returns {void} This function does not return a value.
 */
const errorHandler = (error: any, res: Response) => {
  const cleanErrorMessage = (message: string) => {
    return message.replace(/["']/g, "");
  };
  if (error.name === "ValidationError") {
    return res.status(400).send({
      type: "ValidationError",
      details: error.details,
    });
  }

  if (error instanceof AppError) {
    return res.status(error.status).json({
      message: cleanErrorMessage(error.message),
      status: error.status,
    });
  }
  return res.status(500).send("Something went wrong");
};

export default errorHandler;
