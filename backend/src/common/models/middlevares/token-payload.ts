import { RoleType } from 'growup-shared';

export interface ITokenPayload{
    userId:string,
    userRole:RoleType,
    companyId:string
}
