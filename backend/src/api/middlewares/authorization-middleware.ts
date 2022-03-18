import { NextFunction, Request, Response } from 'express';
import { ITokenPayload } from '~/common/models/middlewares/token-payload';
import { env } from '~/config/env';
import { verify } from 'jsonwebtoken';
import { HttpCode, HttpError } from 'growup-shared';
import { whitelist } from '~/config/whitelist';

const verifyToken = (
  request: Request,
  _response: Response,
  next: NextFunction,
): void => {
  if (
    whitelist.some((path) => {
      if (path.includes('/*')) return RegExp(path).test(request.path);
      return path === request.path;
    })
  ) {
    next();
  } else {
    const token = request.headers.authorization;
    if (!token) {
      throw new HttpError({
        status: HttpCode.UNAUTHORIZED,
        message: 'Required Authorization header not found',
      });
    }
    try {
      const tokenPayload = <ITokenPayload>verify(token, env.app.secretKey);
      request.userId = tokenPayload.userId;
      request.userRole = tokenPayload.role;
      request.companyId = tokenPayload.companyId;

      next();
    } catch {
      throw new HttpError({
        status: HttpCode.UNAUTHORIZED,
        message: 'Invalid Token',
      });
    }
  }
};

export default verifyToken;
