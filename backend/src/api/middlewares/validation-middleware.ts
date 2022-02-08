import { NextFunction, Request, Response } from 'express';
import { ITokenPayload } from '~/common/models/middlevares/token-payload';
import { RoleType } from 'growup-shared';
import * as yup  from 'yup';

  const validatePermissions=(allowedRoles:Array<RoleType>):((request: Request, response: Response, next: NextFunction)=>void)=>{
    return (request: Request, response: Response, next: NextFunction)=>{
        const unauthorized = (message: string):Response => response.status(401).json({
            ok: false,
            status: 401,
            message: message,
        });
        const tokenPayload:ITokenPayload={ ...request.body };
        const userRole=tokenPayload.userRole;
        if(!allowedRoles.includes(userRole)){
            unauthorized('You dont have permissions for this action');
            return;
        }

        next();
    };
  };

  const validateBody=(schema:yup.BaseSchema):((request: Request, response: Response, next: NextFunction)=>void)=>{
      return async (request: Request, response: Response, next: NextFunction)=>{
        const badRequest = (message: string):Response => response.status(400).json({
            ok: false,
            status: 400,
            message: message,
        });
          try{
            request.body=await schema.validate(request.body);
          }catch(error:any){
            if (error.errors.length > 1) {
                badRequest(`${error.message},\n${error.errors.join(',\n')}`);
              } else {
                badRequest(error.message);
              }
              return;
          }

        next();
      };
  };

  export { validatePermissions, validateBody };
