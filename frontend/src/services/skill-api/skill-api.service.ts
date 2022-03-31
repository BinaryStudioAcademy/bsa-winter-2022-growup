import { ContentType, HttpMethod } from 'common/enums/enums';
import { IHttp } from 'common/interfaces/http/http';
import type { ISkill, IResult } from 'common/interfaces/skill/skill';
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

  public async fetchUserSkill(): Promise<ISkill[] | null> {
    try {
      const result = await this.http.load(`${this.apiPath}/skills/user`, {
        contentType: ContentType.JSON,
      });
      return result as ISkill[];
    } catch {
      return null;
    }
  }

  public async fetchUserCareerPathSkills(): Promise<ISkill[] | null> {
    try {
      const result = await this.http.load(
        `${this.apiPath}/skills/career-path/user`,
        {
          contentType: ContentType.JSON,
        },
      );
      return result as ISkill[];
    } catch {
      return null;
    }
  }

  public async createSkill(skillsPayload: SkillProps[]): Promise<ISkill> {
    const result: IResult = await this.http.load(`${this.apiPath}/skills`, {
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
    return result.skills[0] as ISkill;
  }

  public async connectSkill(
    skillsPayload: SkillProps[],
  ): Promise<ISkill | null> {
    try {
      const result: IResult = await this.http.load(
        `${this.apiPath}/skills/user`,
        {
          contentType: ContentType.JSON,
          method: HttpMethod.POST,
          hasAuth: true,
          payload: JSON.stringify([
            {
              name: skillsPayload[0].name,
              type: skillsPayload[0].type,
            },
          ]),
        },
      );
      return result.skills[0] as ISkill;
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
      return result;
    } catch {
      return null;
    }
  }

  public async updateSkill(skillsPayload: ISkill[]): Promise<ISkill | null> {
    try {
      const result = await this.http.load(
        `${this.apiPath}/skills/${skillsPayload[0].id}`,
        {
          contentType: ContentType.JSON,
          method: HttpMethod.PATCH,
          hasAuth: true,
          payload: JSON.stringify([
            {
              name: skillsPayload[0].name,
              type: skillsPayload[0].type,
            },
            {
              rating: skillsPayload[1].rating,
              isStarred: skillsPayload[1].isStarred,
            },
          ]),
        },
      );
      return result as ISkill;
    } catch {
      return null;
    }
  }

  public async updateCareerPathSkill(
    skillsPayload: ISkill[],
  ): Promise<ISkill | null> {
    try {
      const result = await this.http.load(
        `${this.apiPath}/skills/career-path/${skillsPayload[0].id}`,
        {
          contentType: ContentType.JSON,
          method: HttpMethod.PATCH,
          hasAuth: true,
          payload: JSON.stringify([
            {
              type: skillsPayload[0].type,
            },
            {
              rating: skillsPayload[1].rating,
              isStarred: skillsPayload[1].isStarred,
            },
          ]),
        },
      );
      return result as ISkill;
    } catch {
      return null;
    }
  }
}

export { SkillsApi };
