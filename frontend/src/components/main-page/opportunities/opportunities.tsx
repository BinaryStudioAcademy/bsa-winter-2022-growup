import './opportunities.scss';
import OpportunitieCart from './opportunitieCart';

const Opportunities:React.FC = ()=>{
    return(
    <section className="opportunities mt-5 text-start d-flex flex-column">
        <div className="opportunities__header d-flex align-items-center px-2 py-2 rounded-top">
            <p className="opportunities__title flex-shrink-1 flex-grow-1 text-start">Recommended opportunities</p>
            <span className="opportunities__add-opportunity-btn">+ Add Opportunity</span>
        </div>
        <div className="oppotunities__list">
            <OpportunitieCart />
            <OpportunitieCart />
            <OpportunitieCart />
        </div>
    </section>);
};

export default Opportunities;
