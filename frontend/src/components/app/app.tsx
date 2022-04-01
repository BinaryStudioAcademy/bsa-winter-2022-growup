import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useState,
} from 'hooks/hooks';
import AdminRouting from './admin-routing';
import UserRouting from './user-routing';
import { tagsActions } from 'store/actions';
import { getCurrentUser } from 'store/auth/actions';
import { RoleType } from 'common/enums/enums';
import './styles.scss';
import Loader from 'components/loader/loader';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isOurLoading, setIsOurLoading] = useState(true);
  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  const isAdmin = useAppSelector(
    (state) => state.auth.user?.role === RoleType.ADMIN,
  );
  const { isAuthenticated, user, isLoading } = useAppSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (user) {
      setIsOurLoading(false);
    }
    if (user == null && !isLoading) {
      setIsOurLoading(false);
    }
    if (user == null && isLoading) {
      setIsOurLoading(true);
    }
  }, [user, isLoading]);

  useEffect(() => {
    dispatch(tagsActions.fetchTags());
  }, [isAuthenticated]);

  return (
    <>
      {isOurLoading ? (
        <div className="position-absolute top-50 start-50 translate-50-50">
          <Loader />
        </div>
      ) : isAdmin ? (
        <AdminRouting isAuthenticated={isAuthenticated} />
      ) : (
        <div className="wrapper">
          <UserRouting isAuthenticated={isAuthenticated} role={user?.role} />
        </div>
      )}
    </>
  );
};

export default App;
