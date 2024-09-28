import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { indexRouter } from "./routes/indexRouter";
import errorHandler from "./errors/ErrorHandler";

/**
 * Express application instance.
 *
 * Configures middleware for CORS, body parsing, routing, and error handling.
 *
 * @type {Express}
 */
const app = express();
app.use(cors({ origin: "*", credentials: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(indexRouter);

app.use((error: any, res: express.Response) => {
  errorHandler(error, res);
});

export default app;
