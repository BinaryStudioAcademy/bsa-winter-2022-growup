import { ContentType, HttpMethod } from 'common/enums/enums';

import type { IHttp } from 'common/interfaces/http/http';
import { IUser } from 'common/interfaces/user/user';
import { IAuthApi } from 'common/interfaces/api';
import { IChangeRole, SuccessResponse } from 'store/admin/common';

class UsersApi {
  private http: IHttp;
  private apiPath: string;

  constructor({ apiPath, http }: IAuthApi) {
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

  public async deleteUser(id: string): Promise<SuccessResponse> {
    try {
      const response: SuccessResponse = await this.http.load(
        `${this.apiPath}/company/users/${id}`,
        {
          contentType: ContentType.JSON,
          method: HttpMethod.DELETE,
          hasAuth: true,
        },
      );
      return response;
    } catch (_) {
      throw new Error('Can`t delete this user');
    }
  }

  public async changeUserRole({
    userId,
    roleType,
  }: IChangeRole): Promise<IChangeRole> {
    try {
      const data = {
        roleType: roleType,
      };

      const response: IChangeRole = await this.http.load(
        `${this.apiPath}/company/users/${userId}`,
        {
          contentType: ContentType.JSON,
          method: HttpMethod.PUT,
          hasAuth: true,
          payload: JSON.stringify(data),
        },
      );
      return response;
    } catch (_) {
      throw new Error('Can`t change role for this user');
    }
  }
}

export { UsersApi };
