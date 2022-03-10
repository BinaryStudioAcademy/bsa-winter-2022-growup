import { memo } from 'react';
import type { UseTagList } from 'hooks/common';

import Tag from '../tag/tag';

type PropTypes = {
  tagList: UseTagList['list'];
  onDelete: UseTagList['deleteItem'];
};

const InterestsTagList: React.FC<PropTypes> = ({ tagList, onDelete }) => (
  <div className="d-flex flex-wrap gap-2">
    {tagList.map((tag, index) => (
      <Tag
        key={index}
        tag={{ id: tag.id, name: tag.name }}
        onDelete={onDelete}
      />
    ))}
  </div>
);

export default memo(InterestsTagList);
