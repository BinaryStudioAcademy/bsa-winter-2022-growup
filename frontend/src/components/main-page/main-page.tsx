import './styles.scss';
import Notifications from './notifications/notificationList';
import OpportunityList from './opportunities/opportunityList';

const Main_Page:React.FC = ()=>{
    return(
        <>
        <section className="w-100 main-page d-flex flex-column ">
            <Notifications></Notifications>
            <OpportunityList></OpportunityList>
        </section>
        </>
    );
};

export default Main_Page;
