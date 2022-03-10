import { ContentType, HttpMethod } from 'common/enums/enums';
import { Http } from 'services/http/http.service';
import { IAuthApi } from 'common/interfaces/api';
import { CareerJourney } from '../../components/profile/components/profile-info/interfaces';

class CareerJourneyApi {
  private readonly apiPath: string;
  private http: Http;

  constructor({ apiPath, http }: IAuthApi) {
    this.apiPath = apiPath;
    this.http = http;
  }

  getAllCareerJourneys(): Promise<CareerJourney[]> {
    // return this.http.load<CareerJourney[]>(
    //   `${this.apiPath}/user/career-journey`,
    //   {
    //     method: HttpMethod.GET,
    //     contentType: ContentType.JSON,
    //   },
    // );

    return Promise.resolve([
      {
        id: '1',
        position: 'Fullstack JS Developer',
        company: 'Binary Studio',
        startDate: new Date('2020-01-30T03:24:00'),
        endDate: new Date(),
      },
      {
        id: '2',
        position: 'Fullstack JS Developer',
        company: 'Binary Studio',
        startDate: new Date('2021-12-17T03:24:00'),
        endDate: new Date(),
      },
    ]);
  }

  createCareerJourney(payload: CareerJourney): Promise<void> {
    return this.http.load<void>(`${this.apiPath}/user/career-journey`, {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload),
    });
  }

  updateCareerJourney(payload: CareerJourney): Promise<void> {
    return this.http.load<void>(`/user/career-journey/${payload.id}`, {
      method: HttpMethod.PUT,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload),
    });
  }

  removeCareerJourney(payload: CareerJourney): Promise<void> {
    return this.http.load<void>(`/user/career-journey/${payload.id}`, {
      method: HttpMethod.DELETE,
      contentType: ContentType.JSON,
    });
  }
}

export { CareerJourneyApi };
