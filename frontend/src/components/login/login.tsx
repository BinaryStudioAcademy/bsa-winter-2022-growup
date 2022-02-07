import { Button, Container, FloatingLabel, Form } from 'react-bootstrap';
import { Google } from 'react-bootstrap-icons';

const Login: React.FC = () => {
  return (
    <Container className="auth-container">
      <Form className="auth-form">
        <p className="fs-1 text-center mb-4">Sign in</p>

        <FloatingLabel
          controlId="authEmail"
          label="Email address"
          className="mb-3"
        >
          <Form.Control type="email" placeholder="Email address" />
        </FloatingLabel>

        <FloatingLabel
          controlId="authPassword"
          label="Password"
          className="mb-3"
        >
          <Form.Control type="password" placeholder="Password" />
        </FloatingLabel>

        <Form.Group className="mb-3 auth-check" controlId="authCheckbox">
          <Form.Check type="checkbox" label="Remember me" />
          <Button className="auth-btn-link" variant="link">Forgot password?</Button>
        </Form.Group>

        <div className="d-grid gap-2">
          <Button variant="danger" type="submit" size="lg">
            Sign in
          </Button>
          <Form.Text id="authText" className="mb-1 text-center">or</Form.Text>
          <Button variant="primary" type="submit" size="lg">
            <Google className="mx-2" /> Sign in with Google
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Login;
