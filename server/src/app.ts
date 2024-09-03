import express, { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import cors from 'cors';
import httpStatus from 'http-status';
import config from './config';
import connectDB from 'src/config/db';
import router from './routes';
import { ApiError } from './utils';
import { errorHandler } from './middleware/errorHandler';

connectDB();

const app = express();

const limiter = rateLimit({
  windowMs: config.fifteenMins,
  max: 100,
});
app.use(limiter);

app.use(compression());

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

app.use(errorHandler);

export default app;
