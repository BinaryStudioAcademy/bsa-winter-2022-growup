import { Navbar, Container, Row, Col, Nav } from 'react-bootstrap';

import Companies from './components/companies/companies';

import './styles.scss';

const Admin: React.FC = () => (
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
              <Nav.Link href="/">Your Company</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>Users</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>Career path</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
      <Row>
        <Companies />
      </Row>
    </Container>
  </>
);

export default Admin;
