import { NavLink as AppLink } from 'react-router-dom';
import { AppRoute, AdminRoute } from 'common/enums/enums';

type Props = {
  to: AppRoute | AdminRoute;
  className?: string;
};

const Link: React.FC<Props> = ({ children, to, className }) => (
  <AppLink to={to} className={className}>
    {children}
  </AppLink>
);

export default Link;
