import './styles.scss';
import Notifications from './notifications/notificationList';
import OpportunityList from './opportunities/opportunityList';
import { useAppSelector, useEffect } from 'hooks/hooks';
import { useNavigate } from 'react-router-dom';

const MainPage: React.FC = () => {
  const user = useAppSelector((store) => store.profile.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      user.firstName
        ? user.isCompleteTest
          ? null
          : navigate('/profile/settings/2')
        : navigate('/profile/settings/1');
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
