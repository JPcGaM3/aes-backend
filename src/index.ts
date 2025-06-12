import express from 'express';
import { Request, Response, NextFunction } from 'express';
import dotenv from "dotenv";
import apiV1Routes from './routes/v1/index.js';
import { HTTP_STATUS, MESSAGES } from './configs/constants.js';
import { Page_Internal_Error, Page_Not_Found } from './configs/functions.js';
import cors from 'cors';

dotenv.config({path: '../.env'})

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use(Page_Internal_Error);
app.use(Page_Not_Found);
app.use('/api/v1', apiV1Routes);

app.listen(PORT, () => {
  console.log(MESSAGES.SERVER_RUNNING(PORT));
});
