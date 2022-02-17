import { RoleType } from 'growup-shared';

export interface ITokenPayload {
  userId: string;
  role: RoleType;
  companyId: string | null;
}
