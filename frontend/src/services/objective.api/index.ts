import { IOkr } from 'common/interfaces/okr';
import { IObjective } from 'common/interfaces/objective';
import { Http } from 'services/http/http.service';
import { IAuthApi } from 'common/interfaces/api';
import { HttpMethod } from 'common/enums/http/http';
import { ContentType } from 'common/enums/file/file';

class ObjectiveApi {
  private http: Http;
  private apiPath: string;

  constructor({ apiPath, http }: IAuthApi) {
    this.apiPath = apiPath;
    this.http = http;
  }

  public async createObjective({
    okrId,
    objectiveBody,
  }: {
    okrId: string;
    objectiveBody: { name: string; result: number };
  }): Promise<IOkr | null> {
    const options = {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(objectiveBody),
    };

    try {
      const result = await this.http.load<IOkr>(
        `${this.apiPath}/company/okr/${okrId}/objective`,
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
    objective,
  }: {
    okrId: string;
    objective: IObjective;
  }): Promise<IOkr | null> {
    const options = {
      method: HttpMethod.PUT,
      contentType: ContentType.JSON,
      payload: JSON.stringify(objective),
    };

    try {
      const result = await this.http.load<IOkr>(
        `${this.apiPath}/company/okr/${okrId}/objective/${objective.id}`,
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
