import express from 'express';
import bodyParser from 'body-parser';
import apiV1Routes from './routes/v1/index.js';
import { MESSAGES } from './configs/constants.js';

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use('/api/v1', apiV1Routes);

app.listen(PORT, () => {
  console.log(MESSAGES.SERVER_RUNNING(PORT));
});