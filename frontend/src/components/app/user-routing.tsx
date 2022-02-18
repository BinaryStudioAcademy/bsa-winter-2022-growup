import { appRoutes, mentorMenteeRoutes } from './routes/routes';
import { Route, Routes } from 'components/common/common';
import { IRoute } from './common/interfaces';
import Sidebar from '../sidebar/sidebar';
import Header from '../header/header';

interface Props {
  isAuthenticated: boolean;
}

const UserRouting: React.FC<Props> = ({ isAuthenticated }) => (
  <>
    {isAuthenticated && (
      <>
        <Sidebar />
        <Header />
      </>
    )}
    <div className="d-flex">
      <main className="main-container w-100 px-5 pt-3 pb-5">
        <Routes>
          {isAuthenticated
            ? mentorMenteeRoutes.map(({ path, element }: IRoute) => (
                <Route key={path} path={path} element={element} />
              ))
            : appRoutes.map(({ path, element }: IRoute) => (
                <Route key={path} path={path} element={element} />
              ))}
        </Routes>
      </main>
    </div>
  </>
);

export default UserRouting;
