import { parseJwt } from './parse-jwt';

const isValidToken = (token: string): boolean => {
  try {
    parseJwt(token);
    return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return false;
  }
};

export { isValidToken };
