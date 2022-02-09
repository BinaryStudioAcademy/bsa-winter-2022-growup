import { Request } from 'express';
import { RoleType } from 'growup-shared';

export interface IRequest extends Request {
    userId: string,
    userRole: RoleType
}
