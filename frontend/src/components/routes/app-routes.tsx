import { Route, Routes } from '../common/common';
import { AppRoute } from '../../common/enums/enums';
import Login from '../login/login';
import SignUp from '../sign-up/sign-up';

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path={AppRoute.LOGIN} element={<Login />} />
    <Route path={AppRoute.SIGN_UP} element={<SignUp />} />
  </Routes>
);

export default AppRoutes;
