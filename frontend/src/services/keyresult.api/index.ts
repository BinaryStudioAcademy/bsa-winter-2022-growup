import { IKeyResult } from 'common/interfaces/key-result';
import { IAuthApi } from 'common/interfaces/api';
import { Http } from 'services/http/http.service';
import { HttpMethod } from 'common/enums/http/http';
import { ContentType } from 'common/enums/file/file';
import { IKeyResultObject } from 'store/okr/common';

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
    keyResultBody: IKeyResultObject;
  }): Promise<IKeyResult | null> {
    const options = {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(keyResultBody),
    };

    try {
      const result = await this.http.load<IKeyResult>(
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
