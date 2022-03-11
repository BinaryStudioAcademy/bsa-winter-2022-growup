import { ContentType, HttpMethod } from 'common/enums/enums';
import { Http } from 'services/http/http.service';
import { IAuthApi } from 'common/interfaces/api';
import { IEducation } from '../../components/profile/common/interfaces';

class EducationApi {
  private readonly apiPath: string;
  private http: Http;

  constructor({ apiPath, http }: IAuthApi) {
    this.apiPath = apiPath;
    this.http = http;
  }

  getAllEducations(): Promise<IEducation[]> {
    return this.http.load<IEducation[]>(`${this.apiPath}/user/education`, {
      method: HttpMethod.GET,
      contentType: ContentType.JSON,
    });
  }

  createEducation(payload: IEducation): Promise<void> {
    return this.http.load<void>(`${this.apiPath}/user/education`, {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload),
    });
  }

  updateEducation(payload: IEducation): Promise<void> {
    return this.http.load<void>(
      `${this.apiPath}/user/education/${payload.id}`,
      {
        method: HttpMethod.PUT,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }

  removeEducation(payload: IEducation): Promise<void> {
    return this.http.load<void>(
      `${this.apiPath}/user/education/${payload.id}`,
      {
        method: HttpMethod.DELETE,
        contentType: ContentType.JSON,
      },
    );
  }
}

export { EducationApi };
