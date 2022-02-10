import { RoleType } from 'growup-shared';

declare global {
    namespace Express {
        export interface Request {
            userId: string,
            userRole: RoleType
        }
    }
}
