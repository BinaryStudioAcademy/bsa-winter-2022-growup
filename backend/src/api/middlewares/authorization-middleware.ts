import { NextFunction, Response } from 'express';
import { ITokenPayload } from '~/common/models/middlevares/token-payload';
import { env } from '~/config/env';
import { verify } from 'jsonwebtoken';
import { HttpCode, HttpError } from 'growup-shared';
import { IRequest } from '~/common/models/middlevares/request';

const verifyToken = (request: IRequest, _response: Response, next: NextFunction): void => {
    const token = request.headers.authorization;
    if (!token) {
        throw new HttpError({
            status: HttpCode.UNAUTHORIZED,
            message: 'Required Authorization header not found',
        });
    }
    let tokenPayload: ITokenPayload;
    try {
        tokenPayload = <ITokenPayload>verify(token, env.app.secretKey);
    } catch {
        throw new HttpError({
            status: HttpCode.UNAUTHORIZED,
            message: 'Invalid Token',
        });
    }
    request.userId = tokenPayload.userId;
    request.userRole = tokenPayload.userRole;
    next();
};

export default verifyToken;
