import type { TagCreation, TagVisibleInfo } from 'common/types/types';

type UseTagList = {
  list: TagCreation[];
  addItem: (tag: TagCreation) => void;
  deleteItem: (id: TagVisibleInfo['id']) => void;
};

export type { UseTagList };
