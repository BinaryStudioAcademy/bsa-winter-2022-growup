import { StorageKey } from 'common/enums/app/storage-key.enum';
import { ContentType, HttpHeader, HttpMethod } from 'common/enums/enums';
import { HttpOptions } from 'common/types/types';
import { HttpError } from 'exceptions/exceptions';
import { stringify } from 'query-string';
import { Storage } from 'services/storage/storage.service';

class Http {
  private _storage: Storage;

  constructor({ storage }: { storage: Storage }) {
    this._storage = storage;
  }

  public async load<T>(url: string, options: HttpOptions): Promise<T> {
    try {
      const {
        method = HttpMethod.GET,
        payload = null,
        hasAuth = true,
        contentType,
        query,
      } = options;

      const headers = this.getHeaders(hasAuth, contentType);

      const response = await fetch(this.getUrl(url, query), {
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

  private getUrl(url: string, query?: object): string {
    return `${url}${query ? `?${stringify(query)}` : ''}`;
  }

  private getHeaders(hasAuth?: boolean, contentType?: ContentType): Headers {
    const headers = new Headers();

    if (contentType) {
      headers.append(HttpHeader.CONTENT_TYPE, contentType);
    }

    if (hasAuth) {
      const token = this._storage.getItem(StorageKey.TOKEN);
      headers.append(HttpHeader.AUTHORIZATION, `Bearer ${token}`);
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
