import express, { Router } from "express";
import { bookRouter } from "./bookRouter";

const indexRouter: Router = express.Router();

indexRouter.use("/books", bookRouter);

export { indexRouter };
