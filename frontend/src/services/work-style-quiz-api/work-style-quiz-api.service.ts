import { ContentType, HttpMethod } from 'common/enums/enums';
import { Http } from 'services/http/http.service';
import { IQuestion } from 'common/interfaces/user-quiz';

interface IWorkStyleQuizApi {
  apiPath: string;
  http: Http;
}

class WorkStyleQuiz {
  private apiPath: string;
  private http: Http;

  constructor({ apiPath, http }: IWorkStyleQuizApi) {
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
  ): Promise<IQuestion[] | null> {
    try {
      const result = await this.http.load(`${this.apiPath}/work-quiz/result`, {
        contentType: ContentType.JSON,
        method: HttpMethod.POST,
        payload: JSON.stringify(results),
      });

      return result as IQuestion[];
    } catch {
      return null;
    }
  }
}

export { WorkStyleQuiz };
