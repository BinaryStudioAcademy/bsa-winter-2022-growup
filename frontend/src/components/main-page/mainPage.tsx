import './mainPage.scss';
import Notifications from './notifications/notifications';
import Opportunities from './opportunities/opportunities';

const Main_Page:React.FC = ()=>{
    return(
        <>
        <section className="w-100 main-page d-flex flex-column ">
            <Notifications></Notifications>
            <Opportunities></Opportunities>
        </section>
        </>
    );
};

export default Main_Page;
