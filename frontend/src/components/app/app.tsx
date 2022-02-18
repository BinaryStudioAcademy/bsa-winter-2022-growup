import { useAppSelector } from 'hooks/hooks';
import AdminRouting from './admin-routing';
import UserRouting from './user-routing';
import { RoleType } from 'common/enums/enums';
import './app.scss';

const App: React.FC = () => {
  const isAdmin = useAppSelector(
    (state) => state.auth.user?.role === RoleType.ADMIN,
  );
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <>
      {isAdmin ? (
        <AdminRouting isAuthenticated={isAuthenticated} />
      ) : (
        <UserRouting isAuthenticated={isAuthenticated} />
      )}
    </>
  );
};

export default App;
