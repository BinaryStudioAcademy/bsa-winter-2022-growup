import { ContentType, HttpMethod } from 'common/enums/enums';

import type { IHttp } from 'common/interfaces/http/http';
import { IUser } from 'common/interfaces/user/user';

type Props = {
  apiPath: string;
  http: IHttp;
};

class UsersApi {
  private http: IHttp;
  private apiPath: string;

  constructor({ apiPath, http }: Props) {
    this.http = http;
    this.apiPath = apiPath;
  }

  public async inviteUser(
    payload: Pick<IUser, 'email' | 'roleType'>,
  ): Promise<IUser | null> {
    try {
      const result = await this.http.load(`${this.apiPath}/company/users`, {
        contentType: ContentType.JSON,
        method: HttpMethod.POST,
        hasAuth: true,
        payload: JSON.stringify(payload),
      });
      return result as IUser;
    } catch {
      return null;
    }
  }

  public async fetchUsers(): Promise<IUser[] | null> {
    try {
      const result = await this.http.load(`${this.apiPath}/company/users`, {
        contentType: ContentType.JSON,
        method: HttpMethod.GET,
        hasAuth: true,
      });

      return result as IUser[];
    } catch {
      return null;
    }
  }
}

export { UsersApi };
