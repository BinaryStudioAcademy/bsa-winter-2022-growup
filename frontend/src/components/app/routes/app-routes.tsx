import { AppRoute } from '../../../common/enums/enums';
import Login from '../../login/login';
import SignUp from '../../sign-up/sign-up';

export const appRoutes = [
  {
    path: AppRoute.LOGIN,
    element: <Login />,
  },
  {
    path: AppRoute.SIGN_UP,
    element: <SignUp />,
  },
  {
    path: AppRoute.ANY,
    element: <Login />,
  },
];
