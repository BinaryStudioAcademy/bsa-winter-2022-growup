import { memo } from 'react';

type PropTypes = {
  tagName: string;
};

const Tag: React.FC<PropTypes> = ({ tagName }) => {
  return (
    <div className="row">
      <div className="col">{tagName}</div>
    </div>
  );
};

export default memo(Tag);
