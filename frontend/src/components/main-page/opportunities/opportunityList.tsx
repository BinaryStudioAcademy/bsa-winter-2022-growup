import OpportunityItem from './opportunityItem';
import './style.scss';
import { useAppSelector } from 'hooks/hooks';
import { IOpportunity } from 'store/opportunities/common';
const OpportunityList: React.FC = () => {
  const opportunities = useAppSelector((state) => state.homePage.opportunities);
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
        {opportunities.map((item: IOpportunity, index: number) => {
          return (
            <OpportunityItem
              name={item.name}
              organization={item.organization}
              startDate={item.startDate}
              key={index}
              tagsData={item.tagsData}
              type={item.type}
            />
          );
        })}
      </div>
    </section>
  );
};
export default OpportunityList;
