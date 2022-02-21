import OpportunityItem from './opportunityItem';
import './opportunities.scss';
const OpportunityList: React.FC = () => {
  const opportunities = [
    {
      name: 'Learning JS',
      organization: 'Data System Opp',
      startDate: 'March 20 2022',
      type: 'Project/Lecture',
      tags: ['Programming'],
    },
    {
      name: 'QA Testing Like God',
      organization: 'Company Query',
      startDate: 'May 02 2022',
      type: 'Lectury/HomeWork',
      tags: ['Testing'],
    },
    {
      name: 'How to improve your bussiness skills',
      organization: 'Imporove Yourself',
      startDate: 'June 12 2022',
      type: 'Lecture',
      tags: ['Bussiness'],
    },
  ];
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
        {opportunities.map((item, index: number) => {
          return (
            <OpportunityItem
              name={item.name}
              organization={item.organization}
              startDate={item.startDate}
              key={index}
              tagsData={item.tags}
              type={item.type}
            />
          );
        })}
      </div>
    </section>
  );
};
export default OpportunityList;
