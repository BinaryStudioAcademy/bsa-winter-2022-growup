import { useCallback, useState } from 'hooks/hooks';
import { NotificationManager } from 'react-notifications';
import { useAppSelector } from 'hooks/hooks';

import type { TagCreation, TagVisibleInfo } from 'common/types/types';
import type { UseTagList } from './common';

const useTagList = (): UseTagList => {
  const [list, setList] = useState<TagCreation[]>([]);
  const { tags } = useAppSelector((state) => state.tags);

  const addItem = useCallback(
    (tag: TagCreation) => {
      if (tag.name === '') {
        NotificationManager.error('Tag name is empty');
        return;
      }

      const isExistInList = list.find(
        (existingTag) =>
          tag.name.toLowerCase() === existingTag.name.toLowerCase(),
      );
      const isExistInTags = tags.some(
        (item) => item.name.toLowerCase() === tag.name.toLowerCase(),
      );

      if (isExistInList || isExistInTags) {
        NotificationManager.error('Tag name is exist');
        return;
      }
      setList((state) => [...state, tag]);
    },
    [list],
  );

  const deleteItem = useCallback(
    (id: TagVisibleInfo['id']) =>
      setList((state) => state.filter((_, index) => index.toString() !== id)),
    [],
  );

  const clearItems = useCallback(() => setList([]), []);

  return { list, addItem, deleteItem, clearItems };
};

export { useTagList };
