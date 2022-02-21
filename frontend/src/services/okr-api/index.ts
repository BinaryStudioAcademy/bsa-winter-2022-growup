import { IOkr } from 'common/interfaces/okr';
import { Http } from 'services/http/http.service';
import { HttpMethod } from 'common/enums/http/http';
import { ContentType } from 'common/enums/file/file';

class OkrApi {
  private http: Http;

  constructor({ http }: { http: Http }) {
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
      const result = await this.http.load<IOkr[]>('/company/okr', options);
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
      const result = await this.http.load<IOkr>(`/company/okr/${okrId}`, options);
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
      const result = await this.http.load<IOkr>('/company/okr', options);
      return result;
    } catch (e) {
      //passing an error to the handler
      console.warn(e);
      return null;
    }
  }

  public async updateOkr({
    okrId,
    okrBody,
  }: {
    okrId: string;
    okrBody: IOkr;
  }): Promise<IOkr | null> {
    const options = {
      method: HttpMethod.PUT,
      contentType: ContentType.JSON,
      payload: JSON.stringify(okrBody),
    };

    try {
      const result = await this.http.load<IOkr>(`/company/okr/${okrId}`, options);
      return result;
    } catch (e) {
      //passing an error to the handler
      console.warn(e);
      return null;
    }
  }
}

export { OkrApi };
