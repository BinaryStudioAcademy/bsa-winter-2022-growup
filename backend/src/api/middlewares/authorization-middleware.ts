import { NextFunction, Request, Response } from 'express';
import { ITokenPayload } from '~/common/models/middlevares/token-payload';
import { env } from '~/config/env';
import { verify } from 'jsonwebtoken';

const verifyToken = (request: Request, response: Response, next: NextFunction):void => {
    const unauthorized = (message: string):Response => response.status(401).json({
        ok: false,
        status: 401,
        message: message,
    });
    const token = request.headers.authorization;
    if (!token) {
        unauthorized('Required Authorization header not found');
        return;
    }
    let tokenPayload:ITokenPayload;
    try {
        tokenPayload = <ITokenPayload>verify(token, env.app.secretKey);
    } catch {
        unauthorized('Invalid Token');
        return;
    }
    request.body={ ...request.body, ...tokenPayload };
    next();
  };

  export default verifyToken;
