import express, { Router } from "express";
import { BookController } from "../controllers/BookController"; 

const bookRouter: Router = express.Router();

bookRouter
  .route("/")
  .get(BookController.getAllBooks)
  .post(BookController.createBook);

bookRouter
  .route("/:id")
  .put(BookController.updateBook)
  .delete(BookController.deleteBook);

export { bookRouter };
