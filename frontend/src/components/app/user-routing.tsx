import { appRoutes, mentorMenteeRoutes } from './routes/routes';
import { Route, Routes } from 'components/common/common';
import { IRoute } from './common/interfaces';

interface Props {
  isAuthenticated: boolean;
}

const UserRouting: React.FC<Props> = ({ isAuthenticated }) => (
  <Routes>
    {
      isAuthenticated ?
        mentorMenteeRoutes.map(({ path, element }: IRoute) =>
          <Route key={path} path={path} element={element} />) :
        appRoutes.map(({ path, element }: IRoute) =>
          <Route key={path} path={path} element={element} />)
    }
  </Routes>
);

export default UserRouting;
