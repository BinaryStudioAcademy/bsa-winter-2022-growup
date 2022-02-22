import { Http } from 'services/http/http.service';

export interface IAuthApi {
  apiPath: string;
  http: Http;
}
