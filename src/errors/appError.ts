import { AppErrorOptions } from "../types/errorTypes";

/**
 * Custom Error class for handling application-specific errors.
 *
 * @param {AppErrorOptions} options - Options for the error, including message and status code.
 * @property {number} status - HTTP status code associated with the error.
 */
class AppError extends Error {
  status: number;

  constructor({ message, status }: AppErrorOptions) {
    super(message);
    this.status = status;
  }
}

export default AppError;
