import { memo } from 'react';

import Company from './company';
import Tags from './tags/tags';

const Companies: React.FC = () => {
  return (
    <>
      <div className="col col-sm-8 col-md-8 col-lg-8">
        <Company companyList={[]} />
      </div>
      <div className="col col-sm-4 col-md-4 col-lg-4">
        <Tags tagList={[]} />
      </div>
    </>
  );
};

export default memo(Companies);
