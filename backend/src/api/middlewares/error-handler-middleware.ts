import { NextFunction, Request, Response } from 'express';
import { HttpCode, HttpError } from 'growup-shared';

export const errorHandlerMiddleware = (
  err: HttpError,
  _: Request,
  res: Response,
  __: NextFunction,
): void => {
  res.status(err.status || HttpCode.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};
