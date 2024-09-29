import { Response, Request } from "express";
import AppError from "./appError";

/**
 * Express middleware for handling errors.
 *
 * @param {any} error - The error object.
 * @param {Response} res - Express response object.
 *
 * @returns {void} This function does not return a value.
 */

interface ValidationError extends Error {
  details: string[];
}
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  next: any
) => {
  const cleanErrorMessage = (message: string) => {
    return message.replace(/["']/g, "");
  };

  if (error.name === "ValidationError") {
    return res.status(400).send({
      success: false,
      type: "ValidationError",
      details: (error as ValidationError).details,
    });
  }

  if (error instanceof AppError) {
    return res.status(error.status).json({
      success: false,
      message: cleanErrorMessage(error.message),
      status: error.status,
    });
  }

  return res.status(500).send({
    success: false,
    message: "Critical Error Occoured",
    status: 500,
  });
};
