import { NextFunction, Request, Response } from 'express';
import { ITokenPayload } from '~/common/models/middlevares/ITokenPayload';
import { RoleType } from 'growup-shared';

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

  export default validatePermissions;
