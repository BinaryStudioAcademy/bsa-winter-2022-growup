import { RefreshToken } from '~/data/entities/refresh-token';
import { User } from '~/data/entities/user';

export type refreshTokenSchema = {
    user: User,
    token: RefreshToken,
};
