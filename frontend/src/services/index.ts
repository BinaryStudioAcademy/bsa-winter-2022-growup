import { Http } from './http/http.service';
export { AuthApi } from './auth-api/auth-api.service';

import { TagsApi } from './tags-api/tags-api.service';

const http = new Http();
const tags = new TagsApi(http);

export { tags as TagsApi };
