import './opportunities.scss';
import OpportunitieCart from './opportunitieCart';

const Opportunities: React.FC = () => {
  return (
    <section className="opportunities mt-3 text-start d-flex flex-column ">
      <div className=" d-flex align-items-center px-3 py-3 rounded-top bg-gu-blue text-gu-white">
        <span className="flex-shrink-1 flex-grow-1 text-start fs-5">
          Recommended opportunities
        </span>
        <span className="btn btn-outline-gu-white fs-7 ">
          + Add Opportunity
        </span>
      </div>
      <div className="oppotunities__list">
        <OpportunitieCart />
        <OpportunitieCart />
        <OpportunitieCart />
      </div>
    </section>
  );
};

export default Opportunities;
