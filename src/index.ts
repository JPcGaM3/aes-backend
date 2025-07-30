import express from "express";
import dotenv from "dotenv";
import os from "os";
import apiRouter from "./routes/v1/index";
import {
	notFoundHandler,
	errorHandler,
} from "./middlewares/error_handler.middleware";
import cors from "cors";
import { requestLogger } from "./middlewares/logger.middleware";
import { securityMiddleware } from "./middlewares/security.middleware";

if (process.env.NODE_ENV !== "PRODUCTION") {
	dotenv.config({ path: "../.env" });
}

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
app.use(securityMiddleware);

app.use("/api/v1", apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT);
