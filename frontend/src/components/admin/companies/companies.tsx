import { memo } from 'react';
import { useAppSelector } from 'hooks/hooks';

import Company from './company-item';
import Tags from './tags/tags';

const Companies: React.FC = () => {
  const { tags } = useAppSelector((state) => state.admin);

  return (
    <>
      <div className="col col-12 col-sm-12 col-md-8 col-lg-8 ">
        <Company />
      </div>
      <div className="col col-12 col-sm-12 col-md-4 col-lg-4 ">
        <Tags tagList={tags} />
      </div>
    </>
  );
};

export default memo(Companies);
