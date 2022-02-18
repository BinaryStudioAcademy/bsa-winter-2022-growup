import { parseJwt } from './parse-jwt';

const isValidToken = (token: string): boolean => {
  try {
    parseJwt(token);
    return true;
  } catch {
    return false;
  }
};

export { isValidToken };
