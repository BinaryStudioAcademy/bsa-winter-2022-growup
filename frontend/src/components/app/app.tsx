import { useAppSelector } from 'hooks/hooks';
import { adminRoutes, appRoutes, mentorMenteeRoutes } from './routes/routes';
import { Route, Routes } from 'components/common/common';
import Header from 'components/header/header';
import Sidebar from 'components/sidebar/sidebar';
import { IRoute } from './common/interfaces';
import './app.scss';

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
            <Routes>
              {adminRoutes.map(({ path, element }: IRoute) =>
                <Route key={path} path={path} element={element} />)}
            </Routes>
          </div>
        ) : (
          <main className="main-container w-100 px-5 pt-3 pb-5">
            <Routes>
              {
                isAuthenticated ?
                  mentorMenteeRoutes.map(({ path, element }: IRoute) =>
                    <Route key={path} path={path} element={element} />) :
                  appRoutes.map(({ path, element }: IRoute) =>
                    <Route key={path} path={path} element={element} />)
              }
            </Routes>
          </main>
        )}
      </div>
    </div>
  );
};

export default App;
