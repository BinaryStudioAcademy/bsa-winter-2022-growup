import jwt from 'jsonwebtoken';
import { env } from '~/config/env';

export const signToken = <T extends object>(data: T): string => {
  const token = jwt.sign(data, env.app.secretKey, {
    expiresIn: '1d',
  });
  return token;
};

export const generateRefreshToken = <T extends object>(data: T): string => {
  const token = jwt.sign(data, env.app.secretKey, {
    expiresIn: '7d',
  });
  return token;
};
