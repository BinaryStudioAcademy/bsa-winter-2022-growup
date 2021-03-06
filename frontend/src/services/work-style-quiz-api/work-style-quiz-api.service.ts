import { ContentType, HttpMethod } from 'common/enums/enums';
import { Http } from 'services/http/http.service';
import { IAuthApi } from 'common/interfaces/api';
import { IQuestion, IUserQuizResult } from 'common/interfaces/user-quiz';

class WorkStyleQuiz {
  private apiPath: string;
  private http: Http;

  constructor({ apiPath, http }: IAuthApi) {
    this.apiPath = apiPath;
    this.http = http;
  }

  async fetchWorkStyleQuiz(): Promise<IQuestion[] | null> {
    try {
      const result = await this.http.load(
        `${this.apiPath}/work-quiz/question`,
        {
          contentType: ContentType.JSON,
          method: HttpMethod.GET,
          payload: null,
        },
      );

      return result as IQuestion[];
    } catch {
      return null;
    }
  }

  async sendWorkStyleResults(
    results: IQuestion[],
  ): Promise<IUserQuizResult[] | null> {
    try {
      const result = await this.http.load(`${this.apiPath}/work-quiz/result`, {
        contentType: ContentType.JSON,
        method: HttpMethod.POST,
        payload: JSON.stringify(results),
      });

      return result as IUserQuizResult[];
    } catch {
      return null;
    }
  }

  async getWorkStyleQuizRestult(): Promise<IUserQuizResult[] | null> {
    try {
      const results = await this.http.load(`${this.apiPath}/work-quiz/result`, {
        contentType: ContentType.JSON,
        method: HttpMethod.GET,
        payload: null,
      });

      return results as IUserQuizResult[];
    } catch {
      return null;
    }
  }
}

export { WorkStyleQuiz };
