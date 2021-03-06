import { IObjective } from 'common/interfaces/objective';
import { Http } from 'services/http/http.service';
import { IAuthApi } from 'common/interfaces/api';
import { HttpMethod } from 'common/enums/http/http';
import { ContentType } from 'common/enums/file/file';
import { IDeleteObjective } from 'store/okr/common';
import { SuccessResponse } from 'store/admin/common';

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
    keyResults,
  }: {
    okrId: string;
    objectiveBody: { name: string; result: number };
    keyResults: { name: string; result: number }[];
  }): Promise<IObjective | null> {
    const options = {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify({
        objective: objectiveBody,
        keyResults: keyResults,
      }),
    };

    try {
      const result = await this.http.load(
        `${this.apiPath}/company/okr/${okrId}/objective`,
        options,
      );
      return result as IObjective;
    } catch (e) {
      //passing an error to the handler
      console.warn(e);
      return null;
    }
  }

  public async updateObjective({
    okrId,
    objectiveId,
    objectiveBody,
    keyResults,
  }: {
    okrId: string;
    objectiveId: string;
    objectiveBody: { name: string; result: number };
    keyResults: { name: string; result: number }[];
  }): Promise<IObjective | null> {
    const options = {
      method: HttpMethod.PUT,
      contentType: ContentType.JSON,
      payload: JSON.stringify({
        objective: objectiveBody,
        keyResults: keyResults,
      }),
    };

    try {
      const result = await this.http.load(
        `${this.apiPath}/company/okr/${okrId}/objective/${objectiveId}`,
        options,
      );
      return result as IObjective;
    } catch (e) {
      //passing an error to the handler
      console.warn(e);
      return null;
    }
  }
  public async deleteObjective({
    objectiveId,
  }: IDeleteObjective): Promise<SuccessResponse> {
    const options = {
      method: HttpMethod.DELETE,
      contentType: ContentType.JSON,
      payload: null,
    };

    try {
      const result = await this.http.load<SuccessResponse>(
        `${this.apiPath}/company/okr/objective/${objectiveId}`,
        options,
      );
      return result;
    } catch (_) {
      throw new Error('Can`t delete this objective');
    }
  }
}

export { ObjectiveApi };
