import { IKeyResult } from 'common/interfaces/key-result';
import { IOkr } from 'common/interfaces/okr';
import { IAuthApi } from '../auth-api/auth-api.service';
import { Http } from 'services/http/http.service';
import { HttpMethod } from 'common/enums/http/http';
import { ContentType } from 'common/enums/file/file';

class KeyResultApi {
  private http: Http;
  private apiPath: string;

  constructor({ apiPath, http }: IAuthApi) {
    this.apiPath = apiPath;
    this.http = http;
  }

  public async addKeyResult({
    okrId,
    objectiveId,
    keyResultBody,
  }: {
    okrId: string;
    objectiveId: string;
    keyResultBody: IKeyResult;
  }): Promise<IOkr | null> {
    const options = {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(keyResultBody),
    };

    try {
      const result = await this.http.load<IOkr>(
        `${this.apiPath}/company/okr/${okrId}/objective/${objectiveId}/keyresult`,
        options,
      );
      return result;
    } catch (e) {
      //passing an error to the handler
      console.warn(e);
      return null;
    }
  }
}

export { KeyResultApi };
