import { useAppDispatch, useAppSelector, useEffect } from 'hooks/hooks';
import AdminRouting from './admin-routing';
import UserRouting from './user-routing';
import { getCurrentUser } from '../../store/auth/actions';
// import { RoleType } from 'common/enums/enums';
import './app.scss';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  // const isAdmin = useAppSelector(
  //   (state) => state.auth.user?.roleType === RoleType.ADMIN,
  // );
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const isAdmin = false;
  return (
    <div className="wrapper">
      {isAdmin ? (
        <AdminRouting isAuthenticated={isAuthenticated} />
      ) : (
        <UserRouting isAuthenticated={isAuthenticated} />
      )}
    </div>
  );
};

export default App;
