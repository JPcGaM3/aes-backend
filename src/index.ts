import express from 'express';
import { Request, Response, NextFunction } from 'express';
import apiV1Routes from './routes/v1/index.ts';
import { HTTP_STATUS, MESSAGES } from './configs/constants.ts';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', apiV1Routes);

app.use((_err: Error, _req: Request, _res: Response, _next: NextFunction) => {
  console.error(_err.stack);
  _res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Something went wrong!' });
});

app.use((_req: Request, _res: Response, _next: NextFunction) => {
  _res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Resource not found' });
});

app.listen(PORT, () => {
  console.log(MESSAGES.SERVER_RUNNING(PORT));
});