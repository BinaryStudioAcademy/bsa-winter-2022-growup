import { ContentType, HttpMethod } from 'common/enums/enums';
import { IToken, IUserLoginForm } from 'common/interfaces/user';
import { Http } from 'services/http/http.service';

interface IAuthApi {
  apiPath: string;
  http: Http;
}

class AuthApi {
  private _apiPath: string;
  private _http: Http;

  constructor({ apiPath, http }: IAuthApi) {
    this._apiPath = apiPath;
    this._http = http;
  }

  loginUser(payload: IUserLoginForm): Promise<IToken> {
    return this._http.load(`${this._apiPath}/auth/login`, {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload),
      hasAuth: false,
    });
  }
}

export { AuthApi };
