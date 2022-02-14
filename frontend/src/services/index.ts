import { ENV } from 'common/enums/enums';
import { AuthApi } from './auth-api/auth-api.service';
import { CompanyApi } from './company-api';
import { Http } from './http/http.service';
import { Storage } from './storage/storage.service';

const storage = new Storage({
  storage: localStorage,
});

const http = new Http({
  storage,
});

const auth = new AuthApi({
  apiPath: ENV.API_PATH || '',
  http,
});

const company = new CompanyApi({ http });

export { http, storage, auth, company };
