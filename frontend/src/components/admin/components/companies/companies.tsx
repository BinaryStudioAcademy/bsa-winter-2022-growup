import { memo } from 'react';
import { useSelector } from 'hooks/hooks';
import { RootState } from 'common/types/types';

import Company from './company';
import Tags from './tags/tags';

const Companies: React.FC = () => {
  const { companies } = useSelector(({ companies }: RootState) => ({
    companies: companies.companies,
  }));

  return (
    <>
      <div className="col col-sm-8 col-md-8 col-lg-8">
        <Company companyList={companies} />
      </div>
      <div className="col col-sm-4 col-md-4 col-lg-4">
        <Tags tagList={[]} />
      </div>
    </>
  );
};

export default memo(Companies);
