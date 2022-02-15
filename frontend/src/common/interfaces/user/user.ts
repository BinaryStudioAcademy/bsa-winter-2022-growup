import type { IUser as IUserDefault } from 'growup-shared/common/interfaces';

interface IUser extends IUserDefault {
  firstName: string;
  lastName: string;
  avatar: string | null;
  companyId: string;

  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export type { IUser };
