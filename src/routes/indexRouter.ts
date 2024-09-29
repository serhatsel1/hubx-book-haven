import express from "express";
import { bookRouter } from "./bookRouter";

/**
 * Main router for the application.
 *
 * Mounts the `bookRouter` on the `/books` path.
 *
 * @type {Router}
 */
const indexRouter = express.Router();

indexRouter.use("/books", bookRouter);

export { indexRouter };
