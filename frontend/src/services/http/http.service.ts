import { ContentType, HttpHeader, HttpMethod } from 'common/enums/enums';
import { HttpOptions } from 'common/types/types';
import { HttpError } from 'exceptions/exceptions';

class Http {
  public async load<T>(url: string, options: HttpOptions): Promise<T> {
    try {
      const { method = HttpMethod.GET, payload = null, contentType } = options;
      const headers = this.getHeaders(contentType);

      const response = await fetch(url, {
        method,
        headers,
        body: payload,
      });
      await this.checkStatus(response);

      return this.parseJSON<T>(response);
    } catch (err) {
      this.throwError(err);
    }
  }

  private getHeaders(contentType?: ContentType): Headers {
    const headers = new Headers();

    if (contentType) {
      headers.append(HttpHeader.CONTENT_TYPE, contentType);
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
