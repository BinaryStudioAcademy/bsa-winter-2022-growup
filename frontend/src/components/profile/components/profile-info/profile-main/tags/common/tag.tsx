import { memo } from 'react';
import * as Icon from 'react-bootstrap-icons';

import type { TagVisibleInfo } from 'common/types/types';

type PropTypes = {
  tag: TagVisibleInfo;
  onDelete: (id: TagVisibleInfo['id']) => void;
};

const Tag: React.FC<PropTypes> = ({ tag, onDelete }) => {
  return (
    <div className="row tag bg-gu-white text-gu-blue fs-6 g-0">
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
