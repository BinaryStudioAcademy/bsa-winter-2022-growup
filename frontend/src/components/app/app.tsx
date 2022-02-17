import { useAppSelector } from 'hooks/hooks';
import Header from 'components/header/header';
import Sidebar from 'components/sidebar/sidebar';
import AdminRouting from './admin-routing';
import UserRouting from './user-routing';
import './app.scss';

const App: React.FC = () => {
  const isAdmin = false;
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <div>
      {
        isAdmin || !isAuthenticated ? null : (
          <>
            <Sidebar />
            <Header />
          </>
        )
      }
      <div className="d-flex">
        {
          isAdmin ? (
            <div className="w-100">
              <AdminRouting />
            </div>
          ) : (
            <main className="main-container w-100 px-5 pt-3 pb-5">
              <UserRouting isAuthenticated={isAuthenticated} />
            </main>
          )
        }
      </div>
    </div>
  );
};

export default App;
