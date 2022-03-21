import { ContentType, HttpMethod } from 'common/enums/enums';
import {
  IToken,
  IUser,
  IUserLoginForm,
  IUserSignUpForm,
} from 'common/interfaces/user';
import { Http } from 'services/http/http.service';
import { IAuthApi } from 'common/interfaces/api';
import { FirstStepFormType } from 'components/profile-settings/steps/common/types';

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

  signUpUser(payload: IUserSignUpForm): Promise<IToken> {
    return this._http.load(`${this._apiPath}/auth/register`, {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload),
      hasAuth: false,
    });
  }

  verifyRegistrationToken(payload: string): Promise<IToken> {
    return this._http.load(`${this._apiPath}/auth/register/verify/${payload}`, {
      method: HttpMethod.GET,
      contentType: ContentType.JSON,
      payload: null,
      hasAuth: false,
    });
  }

  finishRegistration(payload: FirstStepFormType): Promise<IUser> {
    return this._http.load(`${this._apiPath}/auth/register/finish`, {
      contentType: ContentType.JSON,
      method: HttpMethod.PATCH,
      payload: JSON.stringify(payload),
    });
  }
}

export { AuthApi };
