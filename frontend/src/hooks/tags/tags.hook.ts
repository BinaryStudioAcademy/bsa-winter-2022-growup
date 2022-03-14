import { useCallback, useState, useRef } from 'hooks/hooks';
import { NotificationManager } from 'react-notifications';

import type { TagCreation, TagVisibleInfo } from 'common/types/types';
import type { UseTagList } from './common';

const useTagList = (): UseTagList => {
  const [list, setList] = useState<TagCreation[]>([]);

  const listRef = useRef<TagCreation[]>([]);
  listRef.current = list;

  const addItem = useCallback((tag: TagCreation) => {
    if (tag.name === '') {
      NotificationManager.error('Tag name is empty');
      return;
    }

    const isExist = listRef.current.some((item) => item.name === tag.name);

    if (isExist) {
      NotificationManager.error('Tag name is exist');
      return;
    }
    setList((state) => [...state, tag]);
  }, []);

  const deleteItem = useCallback(
    (id: TagVisibleInfo['id']) =>
      setList((state) => state.filter((_, index) => index.toString() !== id)),
    [],
  );

  const clearItems = useCallback(() => setList([]), []);

  return { list, addItem, deleteItem, clearItems };
};

export { useTagList };
