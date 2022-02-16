import { Navbar, Container, Nav } from 'react-bootstrap';
import { AppRoute } from 'common/enums/enums';

import Companies from './companies/companies';
import Users from './users/users';
import CareerPath from './career-path/career-path';

import { Link } from 'components/common/common';
import logo from 'assets/img/logo.svg';

enum Variants {
  company = 'company',
  users = 'users',
  career = 'career',
}

type PropTypes = {
  variant: keyof typeof Variants;
};

const Admin: React.FC<PropTypes> = ({ variant }) => (
  <>
    <Navbar
      expand="lg"
      className="growup-navigation mb-5"
      bg="growup-navigation"
    >
      <Container>
        <Navbar.Brand>
          <a className="d-flex align-items-center text-decoration-none" href="">
            <img className="logo-icon me-md-3" src={logo} alt="logo" />
            <span className="logo-title fs-1 text-gu-black m-0 d-none d-md-block">
              Grow Up
            </span>
          </a>
        </Navbar.Brand>
        <Nav>
          <Nav.Item>Admin Profile Img</Nav.Item>
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
                to={AppRoute.ADMIN}
              >
                Your Company
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                className={`nav-link ${
                  variant === Variants.users ? 'active' : ''
                }`}
                to={AppRoute.ADMIN_USERS}
              >
                Users
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                className={`nav-link ${
                  variant === Variants.career ? 'active' : ''
                }`}
                to={AppRoute.ADMIN_CAREER_PATH}
              >
                Career path
              </Link>
            </Nav.Item>
          </Nav>
        </div>
      </div>
      <div className="row">
        {variant === Variants.company && <Companies />}
        {variant === Variants.users && <Users userList={[]} />}
        {variant === Variants.career && <CareerPath />}
      </div>
    </Container>
  </>
);

export default Admin;
