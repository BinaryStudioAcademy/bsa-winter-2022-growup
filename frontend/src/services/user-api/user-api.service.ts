import { ContentType, HttpMethod } from 'common/enums/enums';

import type { IHttp } from 'common/interfaces/http/http';
import { IUser } from 'common/interfaces/user/user';
import { IAuthApi } from 'common/interfaces/api';
import {
  IChangePosition,
  IChangeRole,
  SuccessResponse,
} from 'store/admin/common';
import { IRegistrationURL } from 'common/interfaces/user/token';

class UsersApi {
  private http: IHttp;
  private apiPath: string;

  constructor({ apiPath, http }: IAuthApi) {
    this.http = http;
    this.apiPath = apiPath;
  }

  public async inviteUser(
    payload: Pick<IUser, 'email' | 'role' | 'level' | 'position'>,
  ): Promise<IUser | null> {
    const { email, role, position, level } = payload;

    try {
      const result = await this.http.load(`${this.apiPath}/company/users`, {
        contentType: ContentType.JSON,
        method: HttpMethod.POST,
        hasAuth: true,
        payload: JSON.stringify({
          email,
          role,
          levelId: level?.id,
          position,
        }),
      });

      return result as IUser;
    } catch {
      return null;
    }
  }

  public async resendActivationMail(
    payload: Pick<IUser, 'id'>,
  ): Promise<unknown> {
    const result = await this.http.load(
      `${this.apiPath}/company/users/${payload.id}`,
      {
        contentType: ContentType.JSON,
        method: HttpMethod.GET,
        hasAuth: true,
      },
    );
    return result;
  }

  public async getUrl(payload: Pick<IUser, 'id'>): Promise<IRegistrationURL> {
    const result: IRegistrationURL = await this.http.load(
      `${this.apiPath}/company/users/token/${payload.id}`,
      {
        contentType: ContentType.JSON,
        method: HttpMethod.GET,
        hasAuth: true,
      },
    );
    return result;
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

  public async changeUserRole({ id, role }: IChangeRole): Promise<IChangeRole> {
    try {
      const response: IChangeRole = await this.http.load(
        `${this.apiPath}/company/users/${id}`,
        {
          contentType: ContentType.JSON,
          method: HttpMethod.PUT,
          hasAuth: true,
          payload: JSON.stringify({ role }),
        },
      );
      return response;
    } catch (_) {
      throw new Error('Can`t change role for this user');
    }
  }

  public async changeUserPosition({
    id,
    position,
    level,
  }: IChangePosition): Promise<IChangePosition> {
    try {
      const response: IChangePosition = await this.http.load(
        `${this.apiPath}/company/users/${id}/position`,
        {
          contentType: ContentType.JSON,
          method: HttpMethod.PUT,
          hasAuth: true,
          payload: JSON.stringify({ position, level }),
        },
      );
      return response;
    } catch (_) {
      throw new Error('Can`t change position for this user');
    }
  }
}

export { UsersApi };
