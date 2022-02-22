import { ENV } from 'common/enums/enums';
import { Http } from './http/http.service';

import { OkrApi } from './okr-api';
import { CompanyApi } from './company-api';
import { ObjectiveApi } from './objective.api';
import { KeyResultApi } from './keyresult.api';
import { Storage } from './storage/storage.service';
import { AuthApi } from './auth-api/auth-api.service';
import { TagsApi } from './tags-api/tags-api.service';
import { UsersApi } from './user-api/user-api.service';
import { ProfileApi } from './profile-api/profile-api.service';
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

const apiConfig = { apiPath: ENV.API_PATH || '', http };

const okr = new OkrApi(apiConfig);
const tags = new TagsApi(apiConfig);
const users = new UsersApi(apiConfig);
const company = new CompanyApi(apiConfig);
const profile = new ProfileApi(apiConfig);
const objective = new ObjectiveApi(apiConfig);
const keyResult = new KeyResultApi(apiConfig);
const workStyleQuiz = new WorkStyleQuiz(apiConfig);

export { tags as TagsApi };
export {
  storage,
  http,
  auth,
  okr,
  tags,
  users,
  profile,
  company,
  objective,
  keyResult,
  workStyleQuiz,
};
