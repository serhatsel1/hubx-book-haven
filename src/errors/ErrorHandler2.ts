import { Request, Response, NextFunction } from "express";
import AppError from "./AppError";

const errorHandler2 = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(error);

  console.log("error.name2", error);
  const cleanErrorMessage = (message: string) => {
    return message.replace(/["']/g, '');
  };
  if (error.name === "ValidationError") {
    return res.status(400).send({
      type: "ValidationError",
      details: error.details,
    });
  }

  if (error instanceof AppError) {
    return res.status(error.status).json({
      // errorCode: error.errorCode,

      message: cleanErrorMessage(error.message),
      status: error.status,
    });
  }

  return res.status(500).send("Something went wrong");
};

export default errorHandler2;
