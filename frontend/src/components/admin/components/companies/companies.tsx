import { memo } from 'react';
import { useAppSelector, useEffect, useAppDispatch } from 'hooks/hooks';
import { adminActions } from 'store/actions';
import { useSelector } from 'hooks/hooks';
import { RootState } from 'common/types/types';

import CompanyList from './company-list';
import Tags from './tags/tags';

const Companies: React.FC = () => {
  const { tags } = useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();

  const { companies } = useSelector(({ companies }: RootState) => ({
    companies: companies.companies,
  }));

  useEffect(() => {
    dispatch(adminActions.fetchTags());
  }, [dispatch]);

  return (
    <>
      <div className="col col-sm-8 col-md-8 col-lg-8">
        <CompanyList companyList={companies} />
      </div>
      <div className="col col-sm-4 col-md-4 col-lg-4">
        <Tags tagList={tags} />
      </div>
    </>
  );
};

export default memo(Companies);
