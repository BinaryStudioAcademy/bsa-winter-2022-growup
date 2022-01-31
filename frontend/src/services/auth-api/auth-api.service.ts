import { IUserWithTokens } from 'common/interfaces/user';

class AuthApi {
  // eslint-disable-next-line
  public async loginUser(loginPayload: any): Promise<IUserWithTokens> {
    return new Promise(resolve => setTimeout(() => resolve(loginPayload), 1000));
  }
}

export { AuthApi };
