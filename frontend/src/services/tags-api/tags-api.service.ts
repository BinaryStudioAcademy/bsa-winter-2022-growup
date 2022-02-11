import { ContentType, HttpMethod } from 'common/enums/enums';

import type { IHttp } from 'common/interfaces/http/http';
import type { ITag } from 'common/interfaces/tag/tag';
import type { TagCreation } from 'common/types/types';

import { TagsApiRoutes } from './common';

class TagsApi {
  private http: IHttp;

  constructor(http: IHttp) {
    this.http = http;
  }

  public async fetchTags(): Promise<ITag[] | null> {
    try {
      const result = await this.http.load(TagsApiRoutes.FETCH_TAGS, {
        contentType: ContentType.JSON,
      });
      return result as ITag[];
    } catch {
      return null;
    }
  }

  public async createTags(
    tagsPayload: TagCreation['name'][],
  ): Promise<ITag[] | null> {
    try {
      const result = await this.http.load(TagsApiRoutes.FETCH_TAGS, {
        contentType: ContentType.JSON,
        method: HttpMethod.POST,
        payload: JSON.stringify({
          tags: tagsPayload,
        }),
      });

      return result as ITag[];
    } catch {
      return null;
    }
  }

  public async deleteTag(tagId: ITag['id']): Promise<unknown> {
    try {
      const result = await this.http.load(
        `${TagsApiRoutes.$DELETE_TAG}${tagId}`,
        {
          contentType: ContentType.JSON,
          method: HttpMethod.DELETE,
        },
      );

      return result;
    } catch {
      return null;
    }
  }
}

export { TagsApi };
