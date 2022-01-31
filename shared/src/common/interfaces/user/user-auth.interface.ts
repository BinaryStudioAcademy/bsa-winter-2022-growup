import { IUser } from './user.interface';

interface IUserWithTokens extends IUser {
  accessToken: string;
  refreshToken: string;
}

export type { IUserWithTokens };
