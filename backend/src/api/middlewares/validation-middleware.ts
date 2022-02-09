import { NextFunction, Response } from 'express';
import { HttpCode, HttpError, RoleType } from 'growup-shared';
import * as yup from 'yup';
import { IRequest } from '~/common/models/middlevares/request';

const validatePermissions = (allowedRoles: Array<RoleType>): ((request: IRequest, response: Response, next: NextFunction) => void) => {
  return (request: IRequest, _response: Response, next: NextFunction) => {
    const userRole = request.userRole;
    if (!allowedRoles.includes(userRole)) {
      throw new HttpError({
        status: HttpCode.UNAUTHORIZED,
        message: 'You dont have permissions for this action',
      });
    }
    next();
  };
};

const validateBody = (schema: yup.BaseSchema): ((request: IRequest, response: Response, next: NextFunction) => void) => {
  return async (request: IRequest, _response: Response, next: NextFunction) => {
    try {
      request.body = await schema.validate(request.body);
    } catch (error: any) {
      const message: string = error.errors.length > 1 ? `${error.message},\n${error.errors.join(',\n')}` : error.message;
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: message,
      });
    }
    next();
  };
};

export { validatePermissions, validateBody };
