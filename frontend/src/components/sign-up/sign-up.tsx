import { Button, Container, FloatingLabel, Form } from 'react-bootstrap';
import '../login/styles.scss';

const SignUp: React.FC = () => {
  return (
    <Container>
      <Form className="auth-form w-100">
        <p className="fs-1 text-center mb-4">Sign up</p>

        <FloatingLabel
          controlId="signupEmail"
          label="Email address"
          className="mb-3"
        >
          <Form.Control type="email" placeholder="Email address" />
        </FloatingLabel>

        <FloatingLabel
          controlId="signupFirstName"
          label="First name"
          className="mb-3"
        >
          <Form.Control type="text" placeholder="First name" />
        </FloatingLabel>

        <FloatingLabel
          controlId="signupLastName"
          label="Last name"
          className="mb-3"
        >
          <Form.Control type="text" placeholder="Last name" />
        </FloatingLabel>

        <FloatingLabel
          controlId="signupPassword"
          label="Password"
          className="mb-3"
        >
          <Form.Control type="password" placeholder="Password" />
        </FloatingLabel>

        <Button className="form-control" variant="danger" type="submit" size="lg">
          Sign up
        </Button>
      </Form>
    </Container>
  );
};

export default SignUp;
