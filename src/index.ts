import express from "express";
import dotenv from "dotenv";
import os from "os";
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
  const interfaces = os.networkInterfaces();
  const ipv4List: string[] = [];

  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]!) {
      if (iface.family === "IPv4" && !iface.internal) {
        ipv4List.push(iface.address);
      }
    }
  }

  console.log(`🚀 Server is running at:`);
  console.log(`→ Localhost: http://localhost:${PORT}`);
  ipv4List.forEach((ip) => {
    console.log(`→ Network: http://${ip}:${PORT}`);
  });
});
