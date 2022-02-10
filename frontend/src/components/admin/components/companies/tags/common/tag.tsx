import { ITag } from 'common/interfaces/tag/tag';
import { memo } from 'react';
import * as Icon from 'react-bootstrap-icons';

type PropTypes = {
  tag: ITag;
  onDelete: (id: ITag['id']) => void;
};

const Tag: React.FC<PropTypes> = ({ tag, onDelete }) => {
  return (
    <div className="row tag g-0">
      <div className="col">
        {tag.name}{' '}
        <Icon.XLg
          className="cursor-pointer"
          onClick={(): void => onDelete(tag.id)}
        />
      </div>
    </div>
  );
};

export default memo(Tag);
