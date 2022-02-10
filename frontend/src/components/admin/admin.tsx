import { Navbar, Container, Row, Col, Nav } from 'react-bootstrap';
import { AppRoute } from 'common/enums/enums';

import Companies from './components/companies/companies';
import Users from './components/users/users';
import CareerPath from './components/career-path/career-path';

import { Link } from 'components/common/common';

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
        <Navbar.Brand>Growup Logo</Navbar.Brand>
        <Nav>
          <Nav.Item>Admin Profile Img</Nav.Item>
        </Nav>
      </Container>
    </Navbar>
    <Container className="d-grid gap-2">
      <Row>
        <Col sm={8} lg={8} md={8}>
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
        </Col>
      </Row>
      <Row>
        {variant === Variants.company && <Companies />}
        {variant === Variants.users && <Users userList={[]} />}
        {variant === Variants.career && <CareerPath />}
      </Row>
    </Container>
  </>
);

export default Admin;