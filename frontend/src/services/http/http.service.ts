import { HttpError } from 'exceptions/exceptions';
import { ContentType, HttpHeader, HttpMethod } from 'common/enums/enums';
import { HttpOptions } from 'common/types/types';

import { IHttp } from 'common/interfaces/http/http';

class Http implements IHttp {
  public async load<T = unknown>(
    url: string,
    options: Partial<HttpOptions> = {},
  ): Promise<T> {
    try {
      const { method = HttpMethod.GET, payload = null, contentType } = options;
      const headers = this.getHeaders(contentType);

      const response = await fetch(url, {
        method,
        headers,
        body: payload,
      });
      this.checkStatus(response);

      return this.parseJSON<T>(response);
    } catch (err) {
      this.throwError(err);
    }
  }

  private getHeaders(contentType?: ContentType): Headers {
    const headers = new Headers();

    if (contentType) {
      headers.append(HttpHeader.CONTENT_TYPE, contentType);
      headers.append(
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyNDBhMjY5Yi1iY2NiLTQ2ZWUtYTI0Mi1iMDUxMDVkNDhmMTkiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2NDQ1Njk2MTMsImV4cCI6MTY0NDY1NjAxM30.Wy40ga9XUkwvinXv8KnVWqdmX4qq8vpFzMFU7BUrtyY',
      );
    }

    return headers;
  }

  private checkStatus(response: Response): Response {
    if (!response.ok) {
      throw new HttpError({
        status: response.status,
      });
    }

    return response;
  }

  private parseJSON<T>(response: Response): Promise<T> {
    return response.json();
  }

  private throwError(err: unknown): never {
    throw err;
  }
}

export { Http };
