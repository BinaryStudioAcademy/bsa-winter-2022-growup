import { ITag } from 'common/interfaces/tag/tag';

export type State = {
  tags: ITag[];
  isLoading: boolean;
};

enum ActionType {
  CREATE_TAGS = 'create-tags',
}

export { ActionType };
