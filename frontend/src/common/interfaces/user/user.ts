import type { IUser as IUserDefault } from 'growup-shared/common/interfaces';
import { RoleType } from 'common/enums/enums';

interface IUser extends IUserDefault {
  firstName: string;
  lastName: string;
  avatar: string | null;
  companyId: string;

  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;

  role: typeof RoleType[keyof typeof RoleType];
}

export type { IUser };
