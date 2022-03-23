import OpportunityItem from './opportunity-item';
import './styles.scss';
import { useAppSelector } from 'hooks/hooks';
import { IOpportunity } from 'store/opportunities/common';

import { Button } from 'components/common/common';

const OpportunityList: React.FC = () => {
  const opportunities = useAppSelector((state) => state.homePage.opportunities);
  return (
    <section className="opportunities mt-5 text-start d-flex flex-column ">
      <div className=" d-flex align-items-center px-3 py-3 rounded-top bg-gu-blue text-gu-white">
        <span className="flex-shrink-1 flex-grow-1 text-start fs-5">
          Recommended opportunities
        </span>
        <Button variant="outline-gu-white" className="btn-hover-gu-purple">
          + Add Opportunity
        </Button>
      </div>
      <div>
        {opportunities.map((item: IOpportunity, index: number) => {
          return (
            <OpportunityItem
              key={index}
              name={item.name}
              organization={item.organization}
              type={item.type}
              startDate={item.startDate}
              tagsData={item.tagsData}
            />
          );
        })}
      </div>
    </section>
  );
};
export default OpportunityList;
