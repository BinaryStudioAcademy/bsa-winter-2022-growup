import { ContentType, HttpMethod } from 'common/enums/enums';

import type { IHttp } from 'common/interfaces/http/http';
import { IAuthApi } from 'common/interfaces/api';
import { IOpportunity, IPostOppData } from 'store/opportunities/common';

class OpportunityApi {
  private http: IHttp;
  private apiPath: string;

  constructor({ apiPath, http }: IAuthApi) {
    this.http = http;
    this.apiPath = apiPath;
  }

  public async fetchNewOpp(data: IOpportunity): Promise<IPostOppData[]> {
    const oppData = {
      opportunities: [
        {
          name: data.name,
          organization: data.organization,
          type: data.type,
          startDate: data.startDate,
        },
      ],
    };

    try {
      return await this.http.load(`${this.apiPath}/company/opportunities`, {
        contentType: ContentType.JSON,
        method: HttpMethod.POST,
        hasAuth: true,
        payload: JSON.stringify(oppData),
      });
    } catch (err) {
      throw new Error(`Error with opportunities:${err}`);
    }
  }

  public async fetchLoadOpp(): Promise<IPostOppData[]> {
    try {
      return await this.http.load(`${this.apiPath}/company/opportunities`, {
        contentType: ContentType.JSON,
        method: HttpMethod.GET,
        hasAuth: true,
      });
    } catch (err) {
      throw new Error(`Error with opportunities:${err}`);
    }
  }
}

export { OpportunityApi };
