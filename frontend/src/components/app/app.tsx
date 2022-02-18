import { useAppSelector } from 'hooks/hooks';
import AdminRouting from './admin-routing';
import UserRouting from './user-routing';

const App: React.FC = () => {
  const isAdmin = false;
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
