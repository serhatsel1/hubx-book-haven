import { ErrorType } from "../types/errorTypes";

/**
 * A collection of predefined error types for client and server errors.
 *
 * @property {ClientErrors} ClientErrors - A collection of client error types.
 * @property {ServerErrors} ServerErrors - A collection of server error types.
 */
const ErrorTypes: {
  ClientErrors: {
    [key: string]: ErrorType;
  };
  ServerErrors: {
    [key: string]: ErrorType;
  };
} = {
  ClientErrors: {
    NEGATIVE_VALUE: {
      message: "Price can not be negative",
      status: 400,
    },
    BOOK_NOT_FOUND: {
      status: 404,
      message: "Book not found",
    },

    BOOK_ALREADY_EXISTS: {
      status: 400,
      message: "A book with this title already exists.",
    },

    BOOK_INVALID_ID: {
      message: "Invalid book ID format",
      status: 400,
    },

    BOOK_NOT_FOUND_ID: {
      message: "Book not found with the given ID",
      status: 404,
    },

    ISBN_ALREADY_EXISTS: {
      status: 400,
      message: "A book with this ISBN already exists.",
    },
  },
  ServerErrors: {
    SOMETHING_WENT_WRONG: {
      status: 500,
      message: "something went wrong",
    },
  },
};

export { ErrorTypes };
