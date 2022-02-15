import { ContentType, HttpMethod } from 'common/enums/enums';
import { IUser } from 'common/interfaces/user';
import { Http } from 'services/http/http.service';

interface IProfileApi {
  apiPath: string;
  http: Http;
}

class ProfileApi {
  private _apiPath: string;
  private _http: Http;

  constructor({ apiPath, http }: IProfileApi) {
    this._apiPath = apiPath;
    this._http = http;
  }

  fetchProfile(): Promise<IUser> {
    return this._http.load(`${this._apiPath}/user`, {
      method: HttpMethod.GET,
      contentType: ContentType.JSON,
      hasAuth: true,
      payload: null,
    });
  }

  updateAvatar(image: File): Promise<IUser> {
    const formData = new FormData();
    formData.append('avatar', image);

    return this._http.load(`${this._apiPath}/user/avatar`, {
      method: HttpMethod.PUT,
      contentType: ContentType.MULTIPART_FORM_DATA,
      hasAuth: true,
      payload: formData,
    });
  }
}

export { ProfileApi };
