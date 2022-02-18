import { ContentType, HttpMethod } from 'common/enums/enums';

import type { IHttp } from 'common/interfaces/http/http';
import type { ITag } from 'common/interfaces/tag/tag';
import type { TagCreation } from 'common/types/types';

type Props = {
  apiPath: string;
  http: IHttp;
};

type CreateTagResponse = {
  tags: ITag[];
  existingTags: string[];
};

class TagsApi {
  private http: IHttp;
  private apiPath: string;

  constructor({ apiPath, http }: Props) {
    this.http = http;
    this.apiPath = apiPath;
  }

  public async fetchTags(): Promise<ITag[] | null> {
    try {
      const result = await this.http.load(`${this.apiPath}/company/tags`, {
        contentType: ContentType.JSON,
      });
      return result as ITag[];
    } catch {
      return null;
    }
  }

  public async createTags(
    tagsPayload: TagCreation['name'][],
  ): Promise<CreateTagResponse | null> {
    try {
      const result = await this.http.load(`${this.apiPath}/company/tags`, {
        contentType: ContentType.JSON,
        method: HttpMethod.POST,
        hasAuth: true,
        payload: JSON.stringify({
          tags: tagsPayload,
        }),
      });

      return result as CreateTagResponse;
    } catch {
      return null;
    }
  }

  public async deleteTag(tagId: ITag['id']): Promise<unknown> {
    try {
      const result = await this.http.load(
        `${this.apiPath}/company/tags/${tagId}`,
        {
          contentType: ContentType.JSON,
          method: HttpMethod.DELETE,
          hasAuth: true,
        },
      );

      return result;
    } catch {
      return null;
    }
  }
}

export { TagsApi };
