import { NextFunction, Request, Response } from 'express';
import { HttpError } from 'growup-shared';

export const errorHandlerMiddleware = (
  err: HttpError,
  _: Request,
  res: Response,
  __: NextFunction,
): void => {
  res.status(err.status).json({
    success: false,
    message: err.message,
  });
};
