import OpportunityItem from './opportunityItem';
import { useAppDispatch, useAppSelector, useEffect } from 'hooks/hooks';
import { fetchRecomendedOpp } from 'store/recomended-opportunities/actions';
import './opportunities.scss';
const OpportunityList: React.FC = () => {
  const opportunities = useAppSelector(
    (state) => state.recomededOpportunitiesReducer.opportunities,
  );
  const isLoaded = useAppSelector(
    (state) => state.recomededOpportunitiesReducer.isLoaded,
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    isLoaded ? null : dispatch(fetchRecomendedOpp());
  }, []);
  return (
    <section className="opportunities mt-5 text-start d-flex flex-column ">
      <div className=" d-flex align-items-center px-3 py-3 rounded-top bg-gu-blue text-gu-white">
        <span className="flex-shrink-1 flex-grow-1 text-start fs-5">
          Recommended opportunities
        </span>
        <span className="btn btn-outline-gu-white fs-7 ">
          + Add Opportunity
        </span>
      </div>
      <div className="oppotunities__list">
        {opportunities.map((item, index) => {
          return (
            <OpportunityItem
              name={item.name}
              organization={item.organization}
              startData={item.startDate}
              key={index}
              tags={item.tags}
              type={item.type}
            />
          );
        })}
      </div>
    </section>
  );
};
export default OpportunityList;
