import { memo } from 'react';
import * as Icon from 'react-bootstrap-icons';

import type { TagVisibleInfo } from 'common/types/types';

type Props = {
  tag: TagVisibleInfo;
  onDelete: (id: TagVisibleInfo['id']) => void;
};

const Tag: React.FC<Props> = ({ tag, onDelete }) => {
  return (
    <div className="row tag g-0 m-0">
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
