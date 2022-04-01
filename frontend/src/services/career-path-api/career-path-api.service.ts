import { ContentType, HttpMethod } from 'common/enums/enums';
import { Http } from 'services/http/http.service';
import { IAuthApi } from 'common/interfaces/api';
import { ICareerPathLevel } from 'components/career-path/common/interfaces';
import {
  IConnectLevels,
  IDomain,
  IDomainSetting,
  ILevel,
  ILevelSetting,
  IObjective,
  IObjectiveSetting,
  ISkill,
  ISkillSetting,
} from 'common/interfaces/career-path';

class CareerPath {
  private apiPath: string;
  private http: Http;
  private skillType = 'Hard skills';

  constructor({ apiPath, http }: IAuthApi) {
    this.apiPath = apiPath;
    this.http = http;
  }

  async fetchDomains(): Promise<IDomain[] | null> {
    try {
      const result = await this.http.load(
        `${this.apiPath}/career-path/domain`,
        {
          contentType: ContentType.JSON,
          method: HttpMethod.GET,
          payload: null,
        },
      );

      return result as IDomain[];
    } catch {
      return null;
    }
  }

  async createDomain(domain: IDomainSetting): Promise<IDomain | null> {
    try {
      const result = await this.http.load(
        `${this.apiPath}/career-path/domain`,
        {
          contentType: ContentType.JSON,
          method: HttpMethod.POST,
          payload: JSON.stringify({ ...domain, levels: [] }),
        },
      );

      return result as IDomain;
    } catch {
      return null;
    }
  }

  async updateDomain(
    domain: IDomainSetting & { id: string },
  ): Promise<(IDomainSetting & { id: string }) | null> {
    const { id, name } = domain;
    try {
      const result = await this.http.load(
        `${this.apiPath}/career-path/domain/${id}`,
        {
          contentType: ContentType.JSON,
          method: HttpMethod.PUT,
          payload: JSON.stringify({ name }),
        },
      );

      return result as IDomainSetting & { id: string };
    } catch {
      return null;
    }
  }

  async deleteDomain(
    id: string,
  ): Promise<(IDomainSetting & { id: string }) | null> {
    try {
      const result = await this.http.load(
        `${this.apiPath}/career-path/domain/${id}`,
        {
          contentType: ContentType.JSON,
          method: HttpMethod.DELETE,
          payload: null,
        },
      );

      return result as IDomainSetting & { id: string };
    } catch {
      return null;
    }
  }

  async fetchLevel(id: string): Promise<ICareerPathLevel> {
    const result = await this.http.load(
      `${this.apiPath}/career-path/user/level/${id}`,
      {
        contentType: ContentType.JSON,
        method: HttpMethod.GET,
        payload: null,
      },
    );

    return result as ICareerPathLevel;
  }

  async createLevel(level: ILevelSetting): Promise<ILevel | null> {
    const { domainId, name } = level;
    try {
      const result = await this.http.load(
        `${this.apiPath}/career-path/domain/${domainId}/level`,
        {
          contentType: ContentType.JSON,
          method: HttpMethod.POST,
          payload: JSON.stringify({ name }),
        },
      );
      return result as ILevel;
    } catch {
      return null;
    }
  }

  async updateLevel(
    level: ILevelSetting & { id: string },
  ): Promise<ILevel | null> {
    try {
      const result = await this.http.load(
        `${this.apiPath}/career-path/level/${level.id}`,
        {
          contentType: ContentType.JSON,
          method: HttpMethod.PUT,
          payload: JSON.stringify({ name: level.name }),
        },
      );

      return result as ILevel;
    } catch {
      return null;
    }
  }

  async deleteLevel(id: string): Promise<ILevel | null> {
    try {
      const result = await this.http.load(
        `${this.apiPath}/career-path/level/${id}`,
        {
          contentType: ContentType.JSON,
          method: HttpMethod.DELETE,
          payload: null,
        },
      );

      return result as ILevel;
    } catch {
      return null;
    }
  }

  async createSkill(skill: ISkillSetting): Promise<ISkill> {
    const { levelId, name } = skill;

    const result = await this.http.load(
      `${this.apiPath}/career-path/level/${levelId}/skill`,
      {
        contentType: ContentType.JSON,
        method: HttpMethod.POST,
        payload: JSON.stringify({ name, type: this.skillType }),
      },
    );
    return result as ISkill;
  }

  async updateSkill(
    skill: ISkillSetting & { id: string },
  ): Promise<ISkillSetting & { id: string }> {
    const { id, domainId, levelId, name } = skill;

    const result: ISkill = await this.http.load(
      `${this.apiPath}/career-path/skill/${id}`,
      {
        contentType: ContentType.JSON,
        method: HttpMethod.PUT,
        payload: JSON.stringify({ name }),
      },
    );
    const skillResult = { ...result, domainId, levelId };
    return skillResult as ISkillSetting & { id: string };
  }

  async deleteSkill(id: string): Promise<ISkill | null> {
    try {
      const result = await this.http.load(
        `${this.apiPath}/career-path/skill/${id}`,
        {
          contentType: ContentType.JSON,
          method: HttpMethod.DELETE,
          payload: null,
        },
      );

      return result as ISkill;
    } catch {
      return null;
    }
  }

  async createObjective(
    objective: IObjectiveSetting,
  ): Promise<IObjective | null> {
    const { levelId, skillId, name } = objective;

    const result = await this.http.load(
      `${this.apiPath}/career-path/level/${levelId}/skill/${skillId}/objective`,
      {
        contentType: ContentType.JSON,
        method: HttpMethod.POST,
        payload: JSON.stringify({ name }),
      },
    );

    return result as IObjective;
  }

  async updateObjective(
    objective: IObjectiveSetting & { id: string },
  ): Promise<(IObjectiveSetting & { id: string }) | null> {
    const { id, domainId, levelId, skillId, name } = objective;

    const result: ISkill = await this.http.load(
      `${this.apiPath}/career-path/objective/${id}`,
      {
        contentType: ContentType.JSON,
        method: HttpMethod.PUT,
        payload: JSON.stringify({ name }),
      },
    );
    const objectiveResult = { ...result, domainId, levelId, skillId };
    return objectiveResult as IObjectiveSetting & { id: string };
  }

  async deleteObjective(id: string): Promise<IObjective | null> {
    try {
      const result = await this.http.load(
        `${this.apiPath}/career-path/objective/${id}`,
        {
          contentType: ContentType.JSON,
          method: HttpMethod.DELETE,
          payload: null,
        },
      );

      return result as IObjective;
    } catch {
      return null;
    }
  }

  async connectLevels(
    levelId: ILevel['id'],
    nextLevelId: ILevel['id'][],
  ): Promise<IConnectLevels> {
    const result = await this.http.load(
      `${this.apiPath}/career-path/levels-connection/${levelId}`,
      {
        contentType: ContentType.JSON,
        method: HttpMethod.POST,
        payload: JSON.stringify({ nextLevelId }),
      },
    );
    return result as IConnectLevels;
  }

  async disconnectLevels(
    levelId: ILevel['id'],
    nextLevelId: ILevel['id'],
  ): Promise<ILevel> {
    const result = await this.http.load(
      `${this.apiPath}/career-path/levels-connection/${levelId}/delete/${nextLevelId}`,
      {
        contentType: ContentType.JSON,
        method: HttpMethod.DELETE,
        payload: null,
      },
    );
    return result as ILevel;
  }

  // async connectDomains(
  //   domainId: IConnectDomainsSetting['domainId'],
  //   nextDomainId: IConnectDomainsSetting['domainId'],
  // ): Promise<ICareerPath> {
  //   const result = await this.http.load(
  //     `${this.apiPath}/career-path/${domainId}/connect/${nextDomainId}`,
  //     {
  //       contentType: ContentType.JSON,
  //       method: HttpMethod.POST,
  //       payload: null,
  //     },
  //   );
  //   return result as ICareerPath;
  // }

  // async disconnectDomains(
  //   domainId: IConnectDomainsSetting['domainId'],
  // ): Promise<IConnectLevels> {
  //   const result = await this.http.load(
  //     `${this.apiPath}/career-path/delete/${domainId}`,
  //     {
  //       contentType: ContentType.JSON,
  //       method: HttpMethod.DELETE,
  //       payload: null,
  //     },
  //   );
  //   return result;
  // }
}

export { CareerPath };
