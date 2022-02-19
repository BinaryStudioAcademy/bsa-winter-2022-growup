import type { IUser as IUserDefault } from 'growup-shared/common/interfaces';
import { RoleType } from 'common/enums/user/roles.enum';

interface IUser extends IUserDefault {
  firstName: string;
  lastName: string;
  avatar: string | null;
  companyId: string;

  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;

  roleType: RoleType;
}

export type { IUser };
