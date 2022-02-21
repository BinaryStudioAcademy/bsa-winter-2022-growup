import Follow from './Follow';
import OpportunityItem from 'components/main-page/opportunities/opportunityItem';
import { IAddNewOpportunity } from 'store/opportunities/common';

interface Props extends IAddNewOpportunity {}

const OpportunityPageItem: React.FC<Props> = ({
  name,
  organization,
  startData,
  tags,
  isFollow,
  id,
  type,
}) => {
  return (
    <div className="opportunities__block mt-3 px-3 py-3  rounded-1 shadow-lg border border-1 bg-gu-white d-flex">
      <OpportunityItem
        isOpportunitiesPage={true}
        name={name}
        organization={organization}
        startData={startData}
        tags={tags}
        type={type}
      />
      <Follow isFollow={isFollow} id={id}></Follow>
    </div>
  );
};
export default OpportunityPageItem;
