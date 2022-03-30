import OpportunityItem from './opportunity-item';
import './styles.scss';
import { useAppSelector } from 'hooks/hooks';
import { IOpportunity } from 'store/opportunities/common';

const OpportunityList: React.FC = () => {
  const opportunities = useAppSelector((state) => state.homePage.opportunities);
  return (
    <section className="opportunities mt-5 text-start d-flex flex-column">
      <div className="d-flex align-items-center  bg-gu-blue text-gu-white add-section-header justify-content-between">
        <p className="add-section-header__title m-0 fw-bold fs-4">
          Recommended opportunities
        </p>
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
