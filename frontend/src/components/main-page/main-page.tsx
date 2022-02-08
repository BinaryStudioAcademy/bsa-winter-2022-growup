import 'components/main-page/main-page.scss';
import Notifications from 'components/main-page/notifications/notifications';
import Opportunities from 'components/main-page/opportunities/opportunities';

const Main_Page:React.FC = ()=>{
    return(
        <>
        <section className="main-page">
            <Notifications></Notifications>
            <Opportunities></Opportunities>
        </section>
        </>
    );
};

export default Main_Page;
