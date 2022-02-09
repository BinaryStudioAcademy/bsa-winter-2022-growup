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
              <Nav.Link
                className={variant === Variants.company ? 'active' : ''}
              >
                <Link to={AppRoute.ADMIN}>Your Company</Link>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className={variant === Variants.users ? 'active' : ''}>
                <Link to={AppRoute.ADMIN_USERS}>Users</Link>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className={variant === Variants.career ? 'active' : ''}>
                <Link to={AppRoute.ADMIN_CAREER_PATH}>Career path</Link>
              </Nav.Link>
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
