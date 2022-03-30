import OpportunityItem from './opportunity-item';
import './styles.scss';
import { useAppSelector } from 'hooks/hooks';
import { IOpportunity } from 'store/opportunities/common';

import { Button } from 'components/common/common';
import { Plus } from 'react-bootstrap-icons';

const OpportunityList: React.FC = () => {
  const opportunities = useAppSelector((state) => state.homePage.opportunities);
  return (
    <section className="opportunities text-start d-flex flex-column ">
      <div className="d-flex align-items-center  bg-gu-blue text-gu-white add-section-header justify-content-between">
        <p className="add-section-header__title m-0 fw-bold fs-4">
          Recommended opportunities
        </p>
        <Button
          type="button"
          variant="outline-gu-white"
          className="add-section-header__add btn-hover-gu-purple d-flex align-items-center"
        >
          <Plus className="add-section-header__add-icon" />
          <span> Add Opportunity </span>
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
