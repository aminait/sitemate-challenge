import { NextFunction, Request, Response } from 'express';

import { ApiError } from 'src/utils';

export const errorHandler = (err: ApiError | Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode || 500).json({
      status: 'ERR',
      message: err.message,
      errors: err.errors,
    });
  } else {
    res.status(500).json({
      status: 'ERR',
      message: 'Internal Server Error',
      errors: null,
    });
  }
};
