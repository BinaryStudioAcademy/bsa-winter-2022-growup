import { memo } from 'react';
import { useAppSelector, useEffect, useAppDispatch } from 'hooks/hooks';
import { useSelector } from 'hooks/hooks';
import { RootState } from 'common/types/types';
import { companyActions } from 'store/actions';

import Company from './company-item';
import Tags from './tags/tags';

const Companies: React.FC = () => {
  const { tags } = useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();

  const { companies } = useSelector(({ companies }: RootState) => ({
    companies: companies.companies,
  }));

  useEffect(() => {
    dispatch(companyActions.get_allCompanisesAsync());
  }, [dispatch]);

  return (
    <>
      <div className="col col-12 col-sm-12 col-md-8 col-lg-8 ">
        <Company companyList={companies} />
      </div>
      <div className="col col-12 col-sm-12 col-md-4 col-lg-4 ">
        <Tags tagList={tags} />
      </div>
    </>
  );
};

export default memo(Companies);
