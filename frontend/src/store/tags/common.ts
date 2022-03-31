import { ITag } from 'common/interfaces/tag/tag';

export type State = {
  tags: ITag[];
  userTags: ITag[] | null;
  isLoading: boolean;
};

enum ActionType {
  CREATE_TAGS = 'create-tags',
  CONNECT_TAGS = 'CONNECT_TAGS',
  FETCH_TAGS = 'fetch-tags',
  DELETE_TAG = 'delete-tag',
  ADD_TAGS = 'ADD_TAGS',
}

export { ActionType };
