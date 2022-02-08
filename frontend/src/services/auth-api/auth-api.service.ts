import { ContentType, HttpMethod } from 'common/enums/enums';
import { Http } from 'services';

interface IAuthApi {
  apiPath: string;
  http: Http;
}

interface IUserPayload {
  email: string;
  password: string;
}

class AuthApi {
  private _apiPath: string;
  private _http: Http;

  constructor({ apiPath, http }: IAuthApi) {
    this._apiPath = apiPath;
    this._http = http;
  }

  loginUser(payload: IUserPayload): Promise<any> {
    return this._http.load(`${this._apiPath}/login`, {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload),
    });
  }
}

export { AuthApi };
