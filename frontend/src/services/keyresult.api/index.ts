import { IKeyResult } from 'common/interfaces/key-result';
import { Http } from 'services/http/http.service';
import { HttpMethod } from 'common/enums/http/http';
import { ContentType } from 'common/enums/file/file';

class OkrApi {
  private http: Http;

  constructor({ http }: { http: Http }) {
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
  }): Promise<IKeyResult | null> {
    const options = {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(keyResultBody),
    };

    try {
      const result = await this.http.load<IKeyResult>(
        `/company/okr/${okrId}/objective/${objectiveId}/keyresult`,
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

export { OkrApi };
