import { useAppDispatch, useAppSelector, useEffect } from 'hooks/hooks';
import AdminRouting from './admin-routing';
import UserRouting from './user-routing';
import { tagsActions } from 'store/actions';
import { getCurrentUser } from 'store/auth/actions';
import { RoleType } from 'common/enums/enums';
import './styles.scss';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  const isAdmin = useAppSelector(
    (state) => state.auth.user?.roleType === RoleType.ADMIN,
  );
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(tagsActions.fetchTags());
  }, [isAuthenticated]);

  return (
    <>
      {isAdmin ? (
        <AdminRouting isAuthenticated={isAuthenticated} />
      ) : (
        <div className="wrapper">
          <UserRouting
            isAuthenticated={isAuthenticated}
            role={user?.roleType}
          />
        </div>
      )}
    </>
  );
};

export default App;
