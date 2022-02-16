import { useAppSelector } from 'hooks/hooks';
import { Route, Routes } from 'components/common/common';
import { NotFound } from 'components/not-found';
import Header from 'components/header/header';
import Sidebar from 'components/sidebar/sidebar';
import './app.scss';
import AppRoutes from '../routes/app-routes';
import MentorMenteeRoutes from '../routes/mentor-mentee-routes';

const App: React.FC = () => {
  const isAdmin = false;
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <div>
      {isAdmin || !isAuthenticated ? null : (
        <>
          <Sidebar />
          <Header />
        </>
      )}
      <div className="d-flex">
        {isAdmin ? (
          <div className="w-100">

          </div>
        ) : (
          <main className="main-container w-100 px-5 pt-3 pb-5">
            <Routes>
              <AppRoutes />
              <MentorMenteeRoutes />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        )}
      </div>
    </div>
  );
};

export default App;
