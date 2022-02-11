import { ContentType, HttpMethod } from 'common/enums/enums';

import type { IHttp } from 'common/interfaces/http/http';
import type { ITag } from 'common/interfaces/tag/tag';
import { TagCreation } from 'common/types/types';

import { TagsApiRoutes } from './common';

class TagsApi {
  private http: IHttp;

  constructor(http: IHttp) {
    this.http = http;
  }

  // eslint-disable-next-line
  public async createTags(tagsPayload: TagCreation[]): Promise<ITag[] | null> {
    try {
      // eslint-disable-next-line
      const result = await this.http.load(TagsApiRoutes.FETCH_TAGS, {
        contentType: ContentType.JSON,
        method: HttpMethod.POST,
        payload: {
          tags: tagsPayload.map((tag) => tag.name),
        } as any,
      });

      return result as ITag[];
    } catch {
      return null;
    }
  }
}

export { TagsApi };
