import { HttpCode, HttpError } from 'growup-shared';

export const badRequestError = (message: string): HttpError => {
  return new HttpError({
    status: HttpCode.BAD_REQUEST,
    message,
  });
};