import './styles.scss';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useNavigate,
} from 'hooks/hooks';
import isFirstLogged from 'helpers/check-is-first-logged';
import OpportunityList from './opportunities/opportunity-list';
import * as opportunityActions from 'store/opportunities/actions';

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.profile.user);
  const isLoaded = useAppSelector((state) => state.opportunities.isLoaded);

  useEffect(() => {
    if (!isLoaded) {
      dispatch(opportunityActions.fetchLoadOpportunities());
    }
  }, [dispatch]);

  useEffect(() => {
    isFirstLogged({ user, navigate });
  }, [user]);

  return (
    <>
      <section className="w-100 main-page d-flex flex-column ">
        <OpportunityList></OpportunityList>
      </section>
    </>
  );
};

export default MainPage;
