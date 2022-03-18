import './styles.scss';
import Notifications from './notifications/notificationList';
import { useAppSelector, useEffect, useNavigate } from 'hooks/hooks';
import isFirstLogged from 'helpers/check-is-first-logged';
import OpportunityList from './opportunities/opportunity-list';

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppSelector((store) => store.profile.user);

  useEffect(() => {
    isFirstLogged({ user, navigate });
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
