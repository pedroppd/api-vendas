import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from '@routes/index';
import { AppError } from '@errors/AppError';
import '@config/index';

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(routes);

//Middleware de error
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.status).json({ message: error.message });
  }
  return res.status(500).json({ message: 'Internal server error' });
});

app.listen(5000, () => {
  console.log('Server is running');
});
