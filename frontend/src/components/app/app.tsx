import { useAppSelector } from 'hooks/hooks';
import AdminRouting from './admin-routing';
import UserRouting from './user-routing';
import { RoleType } from 'common/enums/enums';
import './styles.scss';

const App: React.FC = () => {
  const isAdmin = useAppSelector(
    (state) => state.auth.user?.roleType === RoleType.ADMIN,
  );
  const { isAuthenticated } = useAppSelector((state) => state.auth);

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
