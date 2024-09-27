import { Request, Response, NextFunction } from "express"; // Import necessary types from express
import { ErrorTypes } from "../types/ErrorTypes"; // Import your custom error types

interface CustomError extends Error {
  // Define an interface for custom errors (if not already defined)
  status: number;
}

const ErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err); // It's generally better to log errors to the console using console.error

  // Custom errors
  if ((err as CustomError).status && (err as CustomError).status < 1000) {
    res.status((err as CustomError).status).json({
      status: (err as CustomError).status,
      message: err.message,
    });
  }
  // Mongoose errors
  else if (err.code === 11000) {
    res.status(400).json({
      status: 400,
      message: ErrorTypes.ClientErrors.DUPLICATE_KEY_ERROR, // Assuming DUPLICATE_KEY_ERROR is defined in ErrorTypes
    });
  } else if (err.name === "CastError") {
    res.status(400).json(ErrorTypes.ClientErrors.INCORRECT_USER_ID_FORMAT);
  } else if (err.name === "ValidationError") {
    res.status(400).json(ErrorTypes.ClientErrors.VALUE_MISSING);
  }
  // Server errors (all other unhandled errors)
  else {
    res.status(500).json(ErrorTypes.ServerErrors.SOMETHING_WENT_WRONG);
  }
};

export default ErrorHandler;
