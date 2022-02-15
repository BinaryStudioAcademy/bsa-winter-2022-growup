import { ContentType, HttpMethod } from 'common/enums/enums';
import { Http } from 'services/http/http.service';
import { IQuestion } from 'common/interfaces/user-quiz';

interface IUserQuizApi {
  apiPath: string;
  http: Http;
}

class UserQuiz {
  private apiPath: string;
  private http: Http;

  constructor({ apiPath, http }: IUserQuizApi) {
    this.apiPath = apiPath;
    this.http  = http;
  }

  async fetchWorkStyleQuiz(): Promise<IQuestion[] | null > {
    try {
      const result = await this.http.load(`${this.apiPath}/question`, {
        contentType: ContentType.JSON,
        method: HttpMethod.GET,
        payload: null,
      });

      return result as IQuestion[];

    } catch {
      return null;
    }
  }
}

export { UserQuiz };
