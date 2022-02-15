import { env } from '~/config/env';
import { sign } from 'jsonwebtoken';
import { User } from '~/data/entities/user';

export const generateAccessToken = (userId: User) :string => {
  const payload = {
    userId,
    type: 'access',
  };
  const option = {
    expiresIn: '5m',
  };
  return sign(payload, env.app.secretKey, option);
};

export const generateRefreshToken = (userId: User) :string => {
  const payload = {
    userId,
    type: 'refresh',
  };
  const option = {
    expiresIn: '7d',
  };
  return sign(payload, env.app.secretKey, option);
};
