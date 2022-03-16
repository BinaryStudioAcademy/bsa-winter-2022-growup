import './styles.scss';
import Notifications from './notifications/notificationList';
import OpportunityList from './opportunities/opportunityList';
import { useAppSelector, useEffect } from 'hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { MentorMenteeRoute } from 'common/enums/mentor-mentee-route/mentor-mentee-route.enum';

const MainPage: React.FC = () => {
  const user = useAppSelector((store) => store.profile.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      if (!user?.firstName) {
        navigate(`${MentorMenteeRoute.SETTINGS_PROFILE}/1`);
        return;
      }
      if (!user?.isCompleteTest) {
        navigate(`${MentorMenteeRoute.SETTINGS_PROFILE}/2`);
        return;
      }
    }
  }, [user]);
  return (
    <>
      <section className="w-100 main-page d-flex flex-column ">
        <Notifications></Notifications>
        <OpportunityList></OpportunityList>
      </section>
    </>
  );
};
export default MainPage;
