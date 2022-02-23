import { appRoutes, mentorMenteeRoutes } from './routes/routes';
import { Route, Routes } from 'components/common/common';
import { IRoute } from './common/interfaces';
import Sidebar from '../sidebar/sidebar';
import Header from '../header/header';
import './app.scss';
import { RoleType } from 'growup-shared';

interface Props {
  isAuthenticated: boolean;
  role?: RoleType;
}

const UserRouting: React.FC<Props> = ({ isAuthenticated, role }) => (
  <>
    {isAuthenticated && (
      <>
        <div className="sidebar-wrapper">
          <Sidebar />
        </div>
        <div className="header-wrapper">
          <Header />
        </div>
      </>
    )}
    <main className="main-wrapper w-100 px-3 px-md-4 pt-3 pb-3">
      <Routes>
        {isAuthenticated
          ? mentorMenteeRoutes.map(
              ({ path, element, role: routeRole }: IRoute) => {
                if (routeRole && role && routeRole !== role) return;
                return <Route key={path} path={path} element={element} />;
              },
            )
          : appRoutes.map(({ path, element }: IRoute) => (
              <Route key={path} path={path} element={element} />
            ))}
      </Routes>
    </main>
  </>
);

export default UserRouting;
