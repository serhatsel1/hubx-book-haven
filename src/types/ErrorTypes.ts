interface ErrorType {
  status: number;
  message: string;
}

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
