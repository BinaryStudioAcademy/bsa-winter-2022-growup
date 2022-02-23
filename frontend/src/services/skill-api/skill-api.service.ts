import { ContentType } from 'common/enums/enums';
import { IHttp } from 'common/interfaces/http/http';
import type { ISkill } from 'common/interfaces/skill/skill';

type Props = {
  apiPath: string;
  http: IHttp;
};

class SkillsApi {
  private http: IHttp;
  private apiPath: string;

  constructor({ apiPath, http }: Props) {
    this.http = http;
    this.apiPath = apiPath;
  }

  public async fetchSkill(): Promise<ISkill[] | null> {
    try {
      const result = await this.http.load(`${this.apiPath}/skills/user`, {
        contentType: ContentType.JSON,
      });
      return result as ISkill[];
    } catch {
      return null;
    }
  }

  // public async createSkills(
  //     skillsPayload: any,
  // ): Promise<any | null> {
  //     try {
  //         const result = await this.http.load(`${this.apiPath}/skills`, {
  //             contentType: ContentType.JSON,
  //             method: HttpMethod.POST,
  //             hasAuth: true,
  //             payload: JSON.stringify({
  //                 skill: skillsPayload,
  //             }),
  //         });

  //         return result as any;
  //     } catch {
  //         return null;
  //     }
  // }
}

export { SkillsApi };
