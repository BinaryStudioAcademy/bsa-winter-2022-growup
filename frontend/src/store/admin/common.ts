import { ITag } from 'common/interfaces/tag/tag';

export type State = {
  tags: ITag[];
  isLoading: boolean;
};

enum ActionType {
  CREATE_TAGS = 'create-tags',
  FETCH_TAGS = 'fetch-tags',
  DELETE_TAG = 'delete-tag',

  INVITE_USER = 'invite-user',
}

export { ActionType };
