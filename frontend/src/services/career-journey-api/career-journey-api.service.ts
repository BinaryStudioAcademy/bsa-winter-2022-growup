import { ContentType, HttpMethod } from 'common/enums/enums';
import { Http } from 'services/http/http.service';
import { IAuthApi } from 'common/interfaces/api';
import { ICareerJourney } from '../../components/profile/common/interfaces';

class CareerJourneyApi {
  private readonly apiPath: string;
  private http: Http;

  constructor({ apiPath, http }: IAuthApi) {
    this.apiPath = apiPath;
    this.http = http;
  }

  getAllCareerJourneys(): Promise<ICareerJourney[]> {
    return this.http.load<ICareerJourney[]>(
      `${this.apiPath}/user/career-journey`,
      {
        method: HttpMethod.GET,
        contentType: ContentType.JSON,
        payload: null,
      },
    );
  }

  createCareerJourney(payload: ICareerJourney): Promise<void> {
    return this.http.load<void>(`${this.apiPath}/user/career-journey`, {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload),
    });
  }

  updateCareerJourney(payload: ICareerJourney): Promise<void> {
    return this.http.load<void>(
      `${this.apiPath}/user/career-journey/${payload.id}`,
      {
        method: HttpMethod.PUT,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }

  removeCareerJourney(payload: ICareerJourney): Promise<void> {
    return this.http.load<void>(
      `${this.apiPath}/user/career-journey/${payload.id}`,
      {
        method: HttpMethod.DELETE,
        contentType: ContentType.JSON,
        payload: null,
      },
    );
  }
}

export { CareerJourneyApi };
