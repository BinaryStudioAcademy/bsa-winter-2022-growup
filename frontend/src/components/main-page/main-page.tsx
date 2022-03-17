import './styles.scss';
import Notifications from './notifications/notificationList';
import OpportunityList from './opportunities/opportunityList';
import { useAppSelector, useEffect, useNavigate } from 'hooks/hooks';
import isFirstLogged from 'helpers/check-is-first-logged';

const MainPage: React.FC = () => {
  const user = useAppSelector((store) => store.profile.user);
  const navigate = useNavigate();

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
