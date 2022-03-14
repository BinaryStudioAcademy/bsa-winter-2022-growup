import {
  useAppSelector,
  useAppDispatch,
  useEffect,
  useCallback,
} from 'hooks/hooks';
import * as opportunityActions from 'store/opportunities/actions';
import { IOpportunity, SortOption } from 'store/opportunities/common';

import OpportunityPageItem from './opportunitiesPageItem';
import OpportunityModal from './OpportunityModal';
import SortButton from './components/sort-button';

import './styles.scss';

const OpprotunitiesPage: React.FC = () => {
  const opportunities = useAppSelector(
    (state) => state.opportunities.opportunities,
  );

  const dispatch = useAppDispatch();
  const isLoaded = useAppSelector((state) => state.opportunities.isLoaded);

  useEffect(() => {
    isLoaded ? null : dispatch(opportunityActions.fetchLoadOpp());
  }, []);

  const sort = useCallback((by: SortOption) => {
    dispatch(opportunityActions.sortOpportunities(by));
  }, []);

  return (
    <section className="d-flex flex-column">
      <div className=" d-flex align-items-center px-3 py-3 rounded-top bg-gu-blue text-gu-white">
        <span className="flex-shrink-1 flex-grow-1 text-start fs-5">
          Recommended opportunities
        </span>

        <div className="d-flex gap-2">
          <SortButton onClick={sort} />
          <span
            className="btn btn-outline-gu-white btn-hover-gu-purple border-2 fs-5 fw-bold"
            onClick={(): void => {
              dispatch(opportunityActions.showModal());
            }}
          >
            + Add Opportunity
          </span>
        </div>
      </div>
      <div className="oppotunities__list">
        {opportunities.map((item: IOpportunity, index: number) => {
          return (
            <OpportunityPageItem
              name={item.name}
              organization={item.organization}
              startDate={item.startDate}
              type={item.type}
              isFollow={item.isFollow}
              id={item.id}
              key={index}
              tagsData={item.tagsData}
            />
          );
        })}
      </div>
      <OpportunityModal />
    </section>
  );
};
export default OpprotunitiesPage;
