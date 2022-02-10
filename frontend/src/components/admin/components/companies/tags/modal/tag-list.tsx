import { memo } from 'react';
import type { ITag } from 'common/interfaces/tag/tag';
import Tag from '../common/tag';

type PropTypes = {
  tagList: ITag[];
  onDelete: (id: ITag['id']) => void;
};

const TagList: React.FC<PropTypes> = ({ tagList, onDelete }) => (
  <div className="d-flex flex-wrap gap-2">
    {tagList.map((tag) => (
      <Tag key={tag.id} tag={tag} onDelete={onDelete} />
    ))}
  </div>
);

export default memo(TagList);
