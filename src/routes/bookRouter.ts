import express from "express";
import { BookController } from "../controllers/bookController";

const bookRouter = express.Router();

bookRouter.route("/").get(BookController.getAll).post(BookController.create);

bookRouter
  .route("/:id")
  .put(BookController.update)
  .delete(BookController.delete);

export { bookRouter };
