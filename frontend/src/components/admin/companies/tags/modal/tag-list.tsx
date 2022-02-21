import { memo } from 'react';
import type { UseTagList } from 'hooks/common';

import Tag from '../common/tag';

type Props = {
  tagList: UseTagList['list'];
  onDelete: UseTagList['deleteItem'];
};

const TagList: React.FC<Props> = ({ tagList, onDelete }) => (
  <div className="d-flex flex-wrap gap-2">
    {tagList.map((tag, index) => (
      <Tag
        key={index}
        tag={{ id: index.toString(), name: tag.name }}
        onDelete={onDelete}
      />
    ))}
  </div>
);

export default memo(TagList);
