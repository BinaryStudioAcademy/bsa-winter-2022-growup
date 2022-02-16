import { Route, Routes } from '../common/common';
import { AdminRoute } from '../../common/enums/enums';
import Admin from '../admin/admin';

const AdminRoutes: React.FC = () => (
  <Routes>
    <Route path={AdminRoute.ADMIN} element={<Admin variant="company" />} />
    <Route path={AdminRoute.ADMIN_USERS} element={<Admin variant="users" />} />
    <Route path={AdminRoute.ADMIN_CAREER_PATH} element={<Admin variant="career" />} />
  </Routes>
);

export default AdminRoutes;
