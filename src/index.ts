import express from "express";
import dotenv from "dotenv";
import { MESSAGES } from "./configs/constants";
import apiRouter from "./routes/v1/index";
import {
  notFoundHandler,
  errorHandler,
} from "./middlewares/error_handler.middleware";
import cors from "cors";
import { requestLogger } from "./middlewares/logger.middleware";

dotenv.config({ path: "../.env" });

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: "*",
    methods: "*",
    allowedHeaders: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);
app.use("/api/v1", apiRouter);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(MESSAGES.SERVER_RUNNING(PORT));
});
