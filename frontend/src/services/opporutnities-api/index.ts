import { ContentType, HttpMethod } from 'common/enums/enums';

import type { IHttp } from 'common/interfaces/http/http';
import { IAuthApi } from 'common/interfaces/api';
import { IOpportunity, IPostOpportunityData } from 'store/opportunities/common';

class OpportunityApi {
  private http: IHttp;
  private apiPath: string;

  constructor({ apiPath, http }: IAuthApi) {
    this.http = http;
    this.apiPath = apiPath;
  }

  fetchNewOpportunity(data: IOpportunity): Promise<IPostOpportunityData[]> {
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

    return this.http.load(`${this.apiPath}/company/opportunities`, {
      contentType: ContentType.JSON,
      method: HttpMethod.POST,
      hasAuth: true,
      payload: JSON.stringify(oppData),
    });
  }

  fetchLoadOpportunities(): Promise<IPostOpportunityData[]> {
    return this.http.load(`${this.apiPath}/company/opportunities`, {
      contentType: ContentType.JSON,
      method: HttpMethod.GET,
      hasAuth: true,
    });
  }
}

export { OpportunityApi };
