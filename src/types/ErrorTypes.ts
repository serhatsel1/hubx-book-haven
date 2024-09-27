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
    UNAUTHORIZED: {
      status: 401,
      message: "UNAUTHORIZED",
    },
    PASSWORD_MISMATCH: {
      status: 400,
      message: "PASSWORD_MISMATCH",
    },
    CHARACTERS_MAX_LEVEL_AND_LEVEL_DATA_LENGTH_NOT_MATCH: {
      status: 400,
      message: "CHARACTERS_MAX_LEVEL_AND_LEVEL_DATA_LENGTH_NOT_MATCH",
    },
    YOUR_NOT_LOGINED: {
      status: 400,
      message: "YOUR_NOT_LOGINED",
    },
    INCORRECT_USER_ID_FORMAT: {
      status: 400,
      message: "INCORRECT_USER_ID_FORMAT",
    },
    VALUE_MISSING: {
      status: 400,
      message: "VALUE_MISSING",
    },
    VALIDATION_ERROR: {
      status: 400,
      message: "VALIDATION_ERROR",
    },
    YOU_CANNOT_ADD_THIS_NAME_TO_CHARACTER: {
      status: 400,
      message: "YOU_CANNOT_ADD_THIS_NAME_TO_CHARACTER",
    },
    HEXA_PASS_NOT_FOUND_OR_CANT_EDITABLE: {
      status: 400,
      message: "HEXA_PASS_NOT_FOUND_OR_CAN'T_EDITABLE",
    },
    THIS_ID_NOT_HAVE_A_DELETABLE_PASS: {
      status: 400,
      message: "THIS_ID_NOT_HAVE_A_DELETABLE_PASS",
    },
    YOU_CANNOT_ADD_THIS_KEY: {
      status: 400,
      message: "YOU_CANNOT_ADD_THIS_KEY",
    },
    CATEGORY_MISSING: {
      status: 400,
      message: "CATEGORY_MISSING",
    },
    // VALUE_MISSING: { // This is a duplicate, you might want to remove one
    //   status: 400,
    //   message: "VALUE_MISSING",
    // },
    YOU_NEED_TO_FILL_ALL_LANGUAGES: {
      status: 400,
      message: "YOU_NEED_TO_FILL_ALL_LANGUAGES",
    },
    THIS_LANGUAGE_NOT_FOUND: {
      status: 400,
      message: "THIS_LANGUAGE_NOT_FOUND",
    },
    THIS_LANGUAGE_ALREADY_EXIST: {
      status: 400,
      message: "THIS_LANGUAGE_ALREADY_EXIST",
    },
    THERE_IS_NOT_VIDEO_WITH_THAT_ID: {
      status: 400,
      message: "THERE_IS_NOT_VIDEO_WITH_THAT_ID",
    },
    THERE_IS_NOT_BLOG_WITH_THAT_ID: {
      status: 400,
      message: "THERE_IS_NOT_BLOG_WITH_THAT_ID",
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
