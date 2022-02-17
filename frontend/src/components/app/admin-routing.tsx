import { adminRoutes } from './routes/routes';
import { Route, Routes } from 'components/common/common';
import { IRoute } from './common/interfaces';

const AdminRouting: React.FC = () => (
  <Routes>
    {
      adminRoutes.map(({ path, element }: IRoute) =>
        <Route key={path} path={path} element={element} />)
    }
  </Routes>
);

export default AdminRouting;
