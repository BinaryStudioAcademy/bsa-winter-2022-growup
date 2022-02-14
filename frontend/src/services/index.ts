import { ENV } from 'common/enums/enums';
import { AuthApi } from './auth-api/auth-api.service';
import { Http } from './http/http.service';
import { ProfileApi } from './profile-api/profile-api.service';
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

const profile = new ProfileApi({
  apiPath: ENV.API_PATH || '',
  http,
});

export { http, storage, auth, profile };
