import './opportunities.scss';
import OpportunitieCart from './opportunitieCart';

const Opportunities:React.FC = ()=>{
    return(
    <section className="opportunities">
        <div className="opportunities__header">
            <p className="opportunities__title">Recommended opportunities</p>
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
