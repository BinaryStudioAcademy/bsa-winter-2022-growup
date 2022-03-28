import { IOkr } from 'common/interfaces/okr';
import { Http } from 'services/http/http.service';
import { IAuthApi } from 'common/interfaces/api';
import { HttpMethod } from 'common/enums/http/http';
import { ContentType } from 'common/enums/file/file';
import { StatusType } from 'store/okr/common';

class OkrApi {
  private http: Http;
  private apiPath: string;

  constructor({ apiPath, http }: IAuthApi) {
    this.apiPath = apiPath;
    this.http = http;
  }

  public async getAllOkr(): Promise<IOkr[] | null> {
    const options = {
      method: HttpMethod.GET,
      contentType: ContentType.JSON,
      hasAuth: true,
      payload: null,
    };

    try {
      const result = await this.http.load<IOkr[]>(
        `${this.apiPath}/company/okr`,
        options,
      );
      return result;
    } catch (e) {
      //passing an error to the handler
      console.warn(e);
      return null;
    }
  }

  public async getOkrById(okrId: string): Promise<IOkr | null> {
    const options = {
      method: HttpMethod.GET,
      contentType: ContentType.JSON,
      hasAuth: true,
      payload: null,
    };

    try {
      const result = await this.http.load<IOkr>(
        `${this.apiPath}/company/okr/${okrId}`,
        options,
      );
      return result;
    } catch (e) {
      //passing an error to the handler
      console.warn(e);
      return null;
    }
  }

  public async createOkr(okrBody: IOkr): Promise<IOkr | null> {
    const options = {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(okrBody),
    };

    try {
      const result = await this.http.load<IOkr>(
        `${this.apiPath}/company/okr`,
        options,
      );
      return result;
    } catch (e) {
      //passing an error to the handler
      console.warn(e);
      return null;
    }
  }

  public async updateOkr(okr: IOkr): Promise<IOkr | null> {
    const options = {
      method: HttpMethod.PUT,
      contentType: ContentType.JSON,
      payload: JSON.stringify(okr),
    };

    try {
      const result = await this.http.load<IOkr>(
        `${this.apiPath}/company/okr/${okr.id}`,
        options,
      );
      return result;
    } catch (e) {
      //passing an error to the handler
      console.warn(e);
      return null;
    }
  }

  public async updateOkrStatus(
    okrId: string,
    status: StatusType,
  ): Promise<IOkr | null> {
    const options = {
      method: HttpMethod.PUT,
      contentType: ContentType.JSON,
      payload: JSON.stringify({ status }),
    };

    try {
      const result = await this.http.load<IOkr>(
        `${this.apiPath}/company/okr/status/${okrId}`,
        options,
      );
      return result;
    } catch (_) {
      throw new Error('Can`t update okr status');
    }
  }
}

export { OkrApi };
