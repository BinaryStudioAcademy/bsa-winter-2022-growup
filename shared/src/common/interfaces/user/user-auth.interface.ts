import { IUser } from './user.interface';

interface IUserWithTokens extends IUser {
  token: string;
}

export type { IUserWithTokens };
