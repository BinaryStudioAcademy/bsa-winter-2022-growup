import { ContentType, HttpMethod } from 'common/enums/enums';
import { Http } from 'services/http/http.service';
import { IAuthApi } from 'common/interfaces/api';
import { Education } from '../../components/profile/components/profile-info/interfaces';

class EducationApi {
  private readonly apiPath: string;
  private http: Http;

  constructor({ apiPath, http }: IAuthApi) {
    this.apiPath = apiPath;
    this.http = http;
  }

  getAllEducations(): Promise<Education[]> {
    return this.http.load<Education[]>(`${this.apiPath}/user/education`, {
      method: HttpMethod.GET,
      contentType: ContentType.JSON,
    });
  }

  createEducation(payload: Education): Promise<void> {
    return this.http.load<void>(`${this.apiPath}/user/education`, {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload),
    });
  }

  updateEducation(payload: Education): Promise<void> {
    return this.http.load<void>(`/user/education/${payload.id}`, {
      method: HttpMethod.PUT,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload),
    });
  }

  removeEducation(payload: Education): Promise<void> {
    return this.http.load<void>(`/user/education/${payload.id}`, {
      method: HttpMethod.DELETE,
      contentType: ContentType.JSON,
    });
  }
}

export { EducationApi };
