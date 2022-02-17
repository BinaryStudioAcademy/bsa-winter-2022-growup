import { ENV } from 'common/enums/enums';
import { AuthApi } from './auth-api/auth-api.service';
import { Http } from './http/http.service';
import { ProfileApi } from './profile-api/profile-api.service';
import { TagsApi } from './tags-api/tags-api.service';
import { Storage } from './storage/storage.service';
import { WorkStyleQuiz } from './work-style-quiz-api/work-style-quiz-api.service';

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

const tags = new TagsApi({
  apiPath: ENV.API_PATH || '',
  http,
});

const workStyleQuiz = new WorkStyleQuiz({
  apiPath: ENV.API_PATH || '',
  http,
});

export { http, storage, auth, tags, profile, workStyleQuiz };
