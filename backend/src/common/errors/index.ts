import { HttpCode, HttpError } from 'growup-shared';

export const badRequestError = (message: string): HttpError =>
  new HttpError({
    status: HttpCode.BAD_REQUEST,
    message,
  });
