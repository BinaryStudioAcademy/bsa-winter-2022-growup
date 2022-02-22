import { adminRoutes, appRoutes } from './routes/routes';
import { Route, Routes } from 'components/common/common';
import { IRoute } from './common/interfaces';

interface Props {
  isAuthenticated: boolean;
}

const AdminRouting: React.FC<Props> = ({ isAuthenticated }) => {
  isAuthenticated = true;
  return (
    <div className="w-100">
      <Routes>
        {isAuthenticated
          ? adminRoutes.map(({ path, element }: IRoute) => (
              <Route key={path} path={path} element={element} />
            ))
          : appRoutes.map(({ path, element }: IRoute) => (
              <Route key={path} path={path} element={element} />
            ))}
      </Routes>
    </div>
  );
};
export default AdminRouting;
