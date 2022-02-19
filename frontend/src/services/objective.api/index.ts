import { IOkr } from 'common/interfaces/okr';
import { IObjective } from 'common/interfaces/objective';
import { Http } from 'services/http/http.service';
import { HttpMethod } from 'common/enums/http/http';
import { ContentType } from 'common/enums/file/file';

class ObjectiveApi {
  private http: Http;

  constructor({ http }: { http: Http }) {
    this.http = http;
  }

  public async addObjective({
    okrId,
    objectiveBody,
  }: {
    okrId: string;
    objectiveBody: IObjective;
  }): Promise<IOkr | null> {
    const options = {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(objectiveBody),
    };

    try {
      const result = await this.http.load<IOkr>(
        `/company/okr/${okrId}/objective`,
        options,
      );
      return result;
    } catch (e) {
      //passing an error to the handler
      console.warn(e);
      return null;
    }
  }

  public async updateObjective({
    okrId,
    objectivId,
    objectiveBody,
  }: {
    okrId: string;
    objectivId: string;
    objectiveBody: IObjective;
  }): Promise<IOkr | null> {
    const options = {
      method: HttpMethod.PUT,
      contentType: ContentType.JSON,
      payload: JSON.stringify(objectiveBody),
    };

    try {
      const result = await this.http.load<IOkr>(
        `/company/okr/${okrId}/objective/${objectivId}`,
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

export { ObjectiveApi };
