import Follow from './Follow';
// import OpportunitieCart from 'components/main-page/opportunities/opportunitieCart';
import './opportunitiPage.scss';

const OpportunitiePageCart:React.FC = ()=>{
    return(
    <div className="opportunities__block mt-3 px-3 py-3  rounded-1 shadow-lg border border-1 bg-gu-white d-flex">
        {/* <OpportunitieCart isOpportunitiesPage={true} /> */}
        <Follow></Follow>
    </div>
    );
};
export default OpportunitiePageCart;
