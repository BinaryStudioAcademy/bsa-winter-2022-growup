import { useCallback, useState } from 'hooks/hooks';

import type { TagCreation, TagVisibleInfo } from 'common/types/types';
import type { UseTagList } from './common';

const useTagList = (): UseTagList => {
  const [list, setList] = useState<TagCreation[]>([]);

  const addItem = useCallback(
    (tag: TagCreation) => setList((state) => [...state, tag]),
    [],
  );

  const deleteItem = useCallback(
    (id: TagVisibleInfo['id']) =>
      setList((state) => state.filter((_, index) => index.toString() !== id)),
    [],
  );

  return { list, addItem, deleteItem };
};

export { useTagList };
