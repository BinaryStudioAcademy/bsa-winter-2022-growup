import { AdminRoute } from '../../../common/enums/enums';
import Admin from '../../admin/admin';
import { NotFound } from '../../not-found';

export const adminRoutes = [
  {
    path: AdminRoute.ADMIN,
    element: <Admin variant="company" />,
  },
  {
    path: AdminRoute.ADMIN_USERS,
    element: <Admin variant="users" />,
  },
  {
    path: AdminRoute.ADMIN_CAREER_PATH,
    element: <Admin variant="career" />,
  },
  {
    path: AdminRoute.ADMIN_CONNECT_CAREER_PATH,
    element: <Admin variant="connect" />,
  },
  {
    path: AdminRoute.ANY,
    element: <NotFound />,
  },
];
