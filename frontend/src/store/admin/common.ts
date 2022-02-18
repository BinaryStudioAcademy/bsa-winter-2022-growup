import { ITag } from 'common/interfaces/tag/tag';
import { IUser } from 'common/interfaces/user/user';

export type State = {
  tags: ITag[];
  isLoading: boolean;
  users: IUser[];
};

enum ActionType {
  CREATE_TAGS = 'create-tags',
  FETCH_TAGS = 'fetch-tags',
  DELETE_TAG = 'delete-tag',

  INVITE_USER = 'invite-user',
  FETCH_USERS = 'fetch-users',
}

export { ActionType };
