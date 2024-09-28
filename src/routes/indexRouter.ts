import express, { Router } from "express";
import { bookRouter } from "./bookRouter";

/**
 * Main router for the application.
 *
 * Mounts the `bookRouter` on the `/books` path.
 *
 * @type {Router}
 */
const indexRouter: Router = express.Router();

indexRouter.use("/books", bookRouter);

export { indexRouter };
