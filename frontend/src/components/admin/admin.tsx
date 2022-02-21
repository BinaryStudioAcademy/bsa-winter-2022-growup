import { Navbar, Container, Nav } from 'react-bootstrap';
import { AdminRoute } from 'common/enums/enums';

import Companies from './companies/companies';
import Users from './users/users';
import CareerPath from './career-path/career-path';

import { Link, UserAvatar } from 'components/common/common';
import logo from 'assets/img/logo.svg';

import './styles.scss';
import { useAppSelector } from 'hooks/hooks';

enum Variants {
  company = 'company',
  users = 'users',
  career = 'career',
}

type Props = {
  variant: keyof typeof Variants;
};

const Admin: React.FC<Props> = ({ variant }) => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <>
      <Navbar
        expand="lg"
        className="growup-navigation mb-5"
        bg="growup-navigation"
      >
        <Container>
          <Navbar.Brand>
            <Link to={AdminRoute.ADMIN}>
              <a
                className="d-flex align-items-center text-decoration-none"
                href=""
              >
                <img className="logo-icon me-md-3" src={logo} alt="logo" />
                <span className="logo-title fs-1 text-gu-black m-0 d-none d-md-block">
                  Grow Up
                </span>
              </a>
            </Link>
          </Navbar.Brand>
          <Nav>
            <Nav.Item className="cursor-pointer">
              <UserAvatar
                avatar={user?.avatar}
                firstName={user?.firstName}
                lastName={user?.lastName}
                size="50"
              />
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
      <Container className="d-grid gap-2">
        <div className="row">
          <div className="col col-sm-8 col-md-8 col-lg-8">
            <Nav variant="tabs" defaultActiveKey="/">
              <Nav.Item>
                <Link
                  className={`nav-link ${
                    variant === Variants.company ? 'active' : ''
                  }`}
                  to={AdminRoute.ADMIN}
                >
                  Your Company
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  className={`nav-link ${
                    variant === Variants.users ? 'active' : ''
                  }`}
                  to={AdminRoute.ADMIN_USERS}
                >
                  Users
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  className={`nav-link ${
                    variant === Variants.career ? 'active' : ''
                  }`}
                  to={AdminRoute.ADMIN_CAREER_PATH}
                >
                  Career path
                </Link>
              </Nav.Item>
            </Nav>
          </div>
        </div>
        <div className="row gy-4">
          {variant === Variants.company && <Companies />}
          {variant === Variants.users && <Users />}
          {variant === Variants.career && <CareerPath />}
        </div>
      </Container>
    </>
  );
};

export default Admin;
