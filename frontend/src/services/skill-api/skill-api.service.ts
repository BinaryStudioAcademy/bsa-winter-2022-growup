import { ContentType, HttpMethod } from 'common/enums/enums';
import { IHttp } from 'common/interfaces/http/http';
import type { ISkill } from 'common/interfaces/skill/skill';
import { SkillProps } from 'common/types/skills/skills';

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
      const result = await this.http.load(`${this.apiPath}/skills`, {
        contentType: ContentType.JSON,
      });
      return result as ISkill[];
    } catch {
      return null;
    }
  }

  public async createSkill(skillsPayload: SkillProps[]): Promise<any | null> {
    try {
      const result = await this.http.load(`${this.apiPath}/skills`, {
        contentType: ContentType.JSON,
        method: HttpMethod.POST,
        hasAuth: true,
        payload: JSON.stringify([
          {
            name: skillsPayload[0].name,
            type: skillsPayload[0].type,
          },
        ]),
      });
      return result as any;
    } catch {
      return null;
    }
  }

  public async deleteSkill(id: ISkill['id']): Promise<unknown> {
    try {
      const result = await this.http.load(`${this.apiPath}/skills/${id}`, {
        contentType: ContentType.JSON,
        method: HttpMethod.DELETE,
        hasAuth: true,
      });
      console.warn(result);
      return result;
    } catch {
      return null;
    }
  }

  public async updateSkill(skillsPayload: ISkill[]): Promise<any | null> {
    try {
      console.warn(skillsPayload);
      const result = await this.http.load(
        `${this.apiPath}/skills/${skillsPayload[0].id}`,
        {
          contentType: ContentType.JSON,
          method: HttpMethod.PATCH,
          hasAuth: true,
          payload: JSON.stringify({
            name: skillsPayload[0].name,
            type: skillsPayload[0].type,
          }),
        },
      );
      console.warn(result);
      return result as any;
    } catch {
      return null;
    }
  }
}

export { SkillsApi };
