import { Button, Container, FloatingLabel, Form } from 'react-bootstrap';
import { Google } from 'react-bootstrap-icons';
import './styles.scss';

const Login: React.FC = () => {
  return (
    <Container>
      <Form className="auth-form w-100">
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

        <Form.Group className="auth-form__checkbox-container mb-4" controlId="authCheckbox">
          <Form.Check type="checkbox" label="Remember me" />
          <p className="auth-form__btn-link">
            <a className="auth-form__link" href="#">Forgot password?</a>
          </p>
        </Form.Group>

        <div className="d-grid gap-2">
          <Button variant="danger" type="submit" size="lg">
            Sign in
          </Button>
          <Form.Text className="mb-1 text-center">or</Form.Text>
          <Button variant="primary" type="submit" size="lg">
            <Google className="mx-2" /> Sign in with Google
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Login;
