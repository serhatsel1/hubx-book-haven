import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { indexRouter } from "./routes/indexRouter";
import errorHandler2 from "./errors/ErrorHandler2";

const app = express();
app.use(cors({ origin: "*", credentials: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(indexRouter);

app.use(
  (
    error: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    errorHandler2(error, req, res, next);
  }
);

export default app;
