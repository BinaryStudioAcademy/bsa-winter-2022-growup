import { NextFunction, Response, Request } from 'express';
import { HttpCode, HttpError, RoleType } from 'growup-shared';
import * as yup from 'yup';

const validatePermissions = (allowedRoles: Array<RoleType>): ((request: Request, response: Response, next: NextFunction) => void) => {
  return (request: Request, _response: Response, next: NextFunction) => {
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

const validateBody = (schema: yup.BaseSchema): ((request: Request, response: Response, next: NextFunction) => void) => {
  return async (request: Request, _response: Response, next: NextFunction) => {
    try {
      request.body = await schema.validate(request.body);
    } catch (error: unknown) {
      const validationError: yup.ValidationError = error as yup.ValidationError;
      const message: string = validationError.errors.length > 1 ? `${validationError.message},\n${validationError.errors.join(',\n')}` : validationError.message;
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: message,
      });
    }
    next();
  };
};

export { validatePermissions, validateBody };
