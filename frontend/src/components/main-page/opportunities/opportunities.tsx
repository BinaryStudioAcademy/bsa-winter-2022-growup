import './opportunities.scss';
import OpportunitieCart from './opportunitieCart';

const Opportunities:React.FC = ()=>{
    return(
    <section className="opportunities mt-5 text-start d-flex flex-column ">
        <div className="opportunities__header d-flex align-items-center px-3 py-3 rounded-top">
            <span className="opportunities__title flex-shrink-1 flex-grow-1 text-start">Recommended opportunities</span>
            <span className="opportunities__add-opportunity-btn btn btn-outline-light">+ Add Opportunity</span>
        </div>
        <div className="oppotunities__list">
            <OpportunitieCart />
            <OpportunitieCart />
            <OpportunitieCart />
        </div>
    </section>);
};

export default Opportunities;
