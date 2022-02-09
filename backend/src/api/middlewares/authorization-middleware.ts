import { NextFunction, Response } from 'express';
import { ITokenPayload } from '~/common/models/middlewares/token-payload';
import { env } from '~/config/env';
import { verify } from 'jsonwebtoken';
import { HttpCode, HttpError } from 'growup-shared';
import { IRequest } from '~/common/models/middlewares/request';

const verifyToken = (request: IRequest, _response: Response, next: NextFunction): void => {
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
        request.userRole = tokenPayload.userRole;
        next();
    } catch {
        throw new HttpError({
            status: HttpCode.UNAUTHORIZED,
            message: 'Invalid Token',
        });
    }
};

export default verifyToken;
